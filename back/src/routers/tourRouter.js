import { Router } from "express";
import * as Joi from "joi";
import axios from "axios";
import exifr from "exifr";

import { TourService } from "../services/tourService";
import { loginRequired, s3Single } from "../middlewares/";
import { idValidator } from "../validators"; // id가 혹시 비어있는지 또는 누락됐는지를 검사

const tourRouter = Router();

// 전체 랜드마크 정보 가져오기
tourRouter.get("/tour", async (req, res, next) => {
  try {
    const allLandmarks = await TourService.getAllLandmarks({});

    res.status(200).send(allLandmarks);
  } catch (err) {
    next(err);
  }
});

// 텍스트로 검색한 랜드마크 정보 불러오기
tourRouter.get("/tour/search", async (req, res, next) => {
  try {
    // atlas search index 사용해서 한국어 검색 시 최소 2글자를 입력해야 함
    const queryValidator = Joi.string().trim().empty().min(2).required();
    await queryValidator.validateAsync(req.query.name);

    const { name } = req.query;
    const searchLandmark = await TourService.searchLandmark({ name });

    res.status(200).send(searchLandmark);
  } catch (err) {
    next(err);
  }
});

// 이미지로 검색한 랜드마크 정보 불러오기 (ai의 flask 서버와 연동)
tourRouter.post("/tour/image", s3Single(), async (req, res, next) => {
  try {
    const fileValidator = Joi.any().empty().required();
    await fileValidator.validateAsync(req.file);
    const { location } = req.file;

    const pattern1 = ".jpg$";
    const extensionValidator = Joi.string()
      .pattern(new RegExp(pattern1))
      .error(new Error("extension should be JPG"));
    await extensionValidator.validateAsync(location);

    const pattern2 = "(?![^ㄱ-ㅎ|ㅏ-ㅣ|가-힣$]).jpg$";
    const fileNameValidator = Joi.string()
      .pattern(new RegExp(pattern2))
      .error(new Error("fileName should not have Korean"));
    await fileNameValidator.validateAsync(location);

    let { latitude, longitude } = (await exifr.gps(location)) ?? {
      latitude: 0,
      longitude: 0,
    };
    if (latitude && longitude) {
      latitude = Number(latitude.toFixed(2));
      longitude = Number(longitude.toFixed(2));
    }

    const sendImage = await axios.post(
      "http://kdt-ai4-team08.elicecoding.com:5003/prediction",
      {
        imageURL: location, // s3에 저장된 이미지 url을 ai로 보내기
      },
      {
        headers: {
          "content-type": "application/json",
        },
      },
    );
    const { data } = sendImage;
    const result = {
      latitude,
      longitude,
      data,
    };

    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
});

// 랜드마크 ID로 특정 랜드마크 정보 가져오기
tourRouter.get("/tour/:id", async (req, res, next) => {
  try {
    const id = await idValidator.validateAsync(req.params.id);
    const landmark = await TourService.getLandmark({ id });

    res.status(200).send(landmark);
  } catch (err) {
    next(err);
  }
});

// 랜드마크에 좋아요 추가하기
tourRouter.put("/tour/:id/like", loginRequired, async (req, res, next) => {
  try {
    const userId = req.currentUserId;

    const id = await idValidator.validateAsync(req.params.id);
    const addLiketoLandmark = await TourService.addLike({
      id,
      currentUserId: userId,
    });

    res.status(200).json(addLiketoLandmark);
  } catch (err) {
    next(err);
  }
});

// 랜드마크에 좋아요 삭제하기
tourRouter.put("/tour/:id/dislike", loginRequired, async (req, res, next) => {
  try {
    const userId = req.currentUserId;

    const id = await idValidator.validateAsync(req.params.id);
    const removeLikefromLandmark = await TourService.removeLike({
      id,
      currentUserId: userId,
    });

    res.status(200).json(removeLikefromLandmark);
  } catch (err) {
    next(err);
  }
});

// 랜드마크 좋아요 높은 순으로 정렬하기
tourRouter.get("/recommend/likes", async (req, res, next) => {
  try {
    const sortedLandmarks = await TourService.sortByLiked({});

    res.status(200).json(sortedLandmarks);
  } catch (err) {
    next(err);
  }
});

// 랜드마크 리뷰수 많은 순으로 정렬하기
tourRouter.get("/recommend/reviews", async (req, res, next) => {
  try {
    const sortedLandmarks = await TourService.sortByReviews({});

    res.status(200).json(sortedLandmarks);
  } catch (err) {
    next(err);
  }
});

// 랜드마크 평점 평균 높은 순으로 정렬하기
tourRouter.get("/recommend/rating", async (req, res, next) => {
  try {
    const sortedLandmarks = await TourService.sortByRating({});

    res.status(200).json(sortedLandmarks);
  } catch (err) {
    next(err);
  }
});

export { tourRouter };
