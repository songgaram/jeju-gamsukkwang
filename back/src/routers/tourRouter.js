import { loginRequired } from "../middlewares/";
import { TourService } from "../services/TourService";

import { Router } from "express";
import is from "@sindresorhus/is";

const tourRouter = Router();

// 모든 랜드마크 정보 GET
tourRouter.get("/tour", async (req, res, next) => {
	try {
		const allLandmarks = await TourService.getAllLandmarks({});

		res.status(200).send(allLandmarks);
	} catch (err) {
		next(err);
	}
});

// 랜드마크 ID로 특정 랜드마크 정보 GET
tourRouter.get("/tour/:id", async (req, res, next) => {
	try {
		if (is.emptyObject(req.params)) {
			throw new Error("system.error.noLandmarkId");
		}

		const { id } = req.params;

		const landmark = await TourService.getLandmark({ id });

		res.status(200).send(landmark);
	} catch (err) {
		next(err);
	}
});

// 랜드마크 좋아요 추가
tourRouter.put("/tour/:id/like", loginRequired, async (req, res, next) => {
	try {
		if (is.emptyObject(req.params)) {
			throw new Error("system.error.noLandmarkId");
		}

		// req에서 데이터 가져오기
		const userId = req.currentUserId;
		const { id } = req.params;

		const addLiketoLandmark = await TourService.addLike({
			id,
			currentUserId: userId,
		});

		res.status(200).json(addLiketoLandmark);
	} catch (err) {
		next(err);
	}
});

// 랜드마크 싫어요 추가
tourRouter.put("/tour/:id/dislike", loginRequired, async (req, res, next) => {
	try {
		if (is.emptyObject(req.params)) {
			throw new Error("system.error.noLandmarkId");
		}

		// req에서 데이터 가져오기
		const userId = req.currentUserId;
		const { id } = req.params;

		const removeLikefromLandmark = await TourService.removeLike({
			id,
			currentUserId: userId,
		});

		res.status(200).json(removeLikefromLandmark);
	} catch (err) {
		next(err);
	}
});

// 랜드마크 좋아요 높은 순으로 정리
tourRouter.get("/recommend", async (req, res, next) => {
	try {
		const sortedLandmarks = await TourService.sortLandmarks({});

		res.status(200).json(sortedLandmarks);
	} catch (err) {
		next(err);
	}
});

export { tourRouter };
