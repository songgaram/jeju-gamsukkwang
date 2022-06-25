import * as Joi from "joi";

import { tourModel, userModel } from "../db";
import { idValidator } from "../validators"; // id가 혹시 비어있는지 또는 누락됐는지를 검사

class TourService {

	// 전체 랜드마크 정보 가져오기
  static getAllLandmarks = async () => {
    const allLandmarks = await tourModel.findAll({});

    return allLandmarks;
  };

  // 이름으로 랜드마크 검색하기
  static searchLandmark = async ({ name }) => {

    // atlas search index 사용해서 한국어 검색 시 최소 2글자를 입력해야 함
    const dataValidator = Joi.string().trim().empty().min(2).required();
    await dataValidator.validateAsync(name);

    const searchLandmark = await tourModel.searchByName({ name });
    if (searchLandmark.length === 0) {
      throw new Error("system.error.noLandmark");
    }

    return searchLandmark;
  };

	// 랜드마크 ID로 특정 랜드마크 정보 가져오기
  static getLandmark = async ({ id }) => {
    await idValidator.validateAsync(id);

    const isLandmarkExist = await tourModel.isLandmarkExist({ id });
    if (!isLandmarkExist) {
      throw new Error("system.error.noLandmark");
    }

    const landmark = await tourModel.findById({ id });

    return landmark;
  };

	// 랜드마크에 좋아요 추가하기
  static addLike = async ({ id, currentUserId }) => {

		const dataValidator = Joi.object({
      id: Joi.string().trim().empty().required(),
      currentUserId: Joi.string().trim().empty().required(),
    });
    await dataValidator.validateAsync({ id, currentUserId });

    const user = await userModel.findById({ userId: currentUserId });
    if (!user) {
      throw new Error("system.error.noUser");
    }

    const isLandmarkExist = await tourModel.isLandmarkExist({ id });
    if (!isLandmarkExist) {
      throw new Error("system.error.noLandmark");
    }

    const didUserLiked = await tourModel.didUserLiked({
      id,
      currentUserId,
    });
    // 이미 좋아요를 추가한 상태임을 의미 (boolean 타입 리턴)
    if (didUserLiked) {
      throw new Error("system.error.alreadyLiked");
    }

    const addLiketoLandmark = tourModel.addLike({
      id,
      currentUserId,
    });

    return addLiketoLandmark;
  };

	// 랜드마크에 좋아요 삭제하기
  static removeLike = async ({ id, currentUserId }) => {

		const dataValidator = Joi.object({
      id: Joi.string().trim().empty().required(),
      currentUserId: Joi.string().trim().empty().required(),
    });
    await dataValidator.validateAsync({ id, currentUserId });

    const user = await userModel.findById({ userId: currentUserId });
    if (!user) {
      throw new Error("system.error.noUser");
    }

    const isLandmarkExist = await tourModel.isLandmarkExist({ id });
    if (!isLandmarkExist) {
      throw new Error("system.error.noLandmark");
    }

    const didUserLiked = await tourModel.didUserLiked({
      id,
      currentUserId,
    });
		// 삭제할 좋아요가 없음을 의미 (boolean 타입 리턴)
    if (!didUserLiked) {
      throw new Error("system.error.noLiked");
    }

    const removeLikefromLandmark = tourModel.removeLike({
      id,
      currentUserId,
    });

    return removeLikefromLandmark;
  };

	// 랜드마크 좋아요 높은 순으로 정렬하기
  static sortByLiked = async ({}) => {
    const sortLandmarks = await tourModel.sortByLiked({});

    return sortLandmarks;
  };

	// 랜드마크 리뷰수 많은 순으로 정렬하기
  static sortByReviews = async ({}) => {
    const sortLandmarks = await tourModel.sortByReviews({});

    return sortLandmarks;
  };

	// 랜드마크 평점 평균 높은 순으로 정렬하기
  static sortByRating = async ({}) => {
    const sortLandmarks = await tourModel.sortByRating({});

    return sortLandmarks;
  };
}

export { TourService };
