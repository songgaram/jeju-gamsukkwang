import { loginRequired } from "../middlewares/loginRequired";
import { tourService } from "../services/tourService";

import { Router } from "express";
import is from "@sindresorhus/is";

const tourRouter = Router();

// 랜드마크 정보 GET
tourRouter.get("/tour", async (req, res, next) => {
	try {
		if (is.emptyObject(req.query)) {
			throw new Error("system.error.noTitle");
		}

		const { name } = req.query;

		const landmark = await tourService.getLandmark({ name });

		res.status(200).send(landmark);
	} catch (err) {
		next(err);
	}
});

// 랜드마크 좋아요 추가
tourRouter.put("/tour/like", loginRequired, async (req, res, next) => {
	try {
		if (is.emptyObject(req.query)) {
			throw new Error("system.error.noTitle");
		}

		// req에서 데이터 가져오기
		const userId = req.currentUserId;
		const { name } = req.query;

		const addLiketoLandmark = await tourService.addLike({
			name,
			currentUserId: userId,
		});

		res.status(200).json(addLiketoLandmark);
	} catch (err) {
		next(err);
	}
});

// 랜드마크 싫어요 추가
tourRouter.put("/tour/dislike", loginRequired, async (req, res, next) => {
	try {
		if (is.emptyObject(req.query)) {
			throw new Error("system.error.noTitle");
		}

		// req에서 데이터 가져오기
		const userId = req.currentUserId;
		const { name } = req.query;

		const removeLikefromLandmark = await tourService.removeLike({
			name,
			currentUserId: userId,
		});

		res.status(200).json(removeLikefromLandmark);
	} catch (err) {
		next(err);
	}
});

export { tourRouter };
