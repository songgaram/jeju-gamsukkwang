import is from "@sindresorhus/is";

import { loginRequired } from "../middlewares/";
import { ReviewService } from "../services/ReviewService.js";
import { s3Multi } from "../middlewares/multerS3";
import { Router } from "express";

const reviewRouter = Router();
reviewRouter.use(loginRequired);

// 리뷰 작성하기
reviewRouter.post("/review", s3Multi(), async (req, res, next) => {
	try {
		if (is.emptyObject(req.body)) {
			throw new Error("system.error.badRequest");
		}

		const loginUserId = req.currentUserId;
		const { tourId, content, rating } = req.body;

		if (req.files) {
			const images = req.files.map(
				(image) => image.location.split("amazonaws.com/")[1]
			);

			const newReview = await ReviewService.addReviewWithImages({
				loginUserId,
				tourId,
				content,
				rating,
				images,
			});

			res.status(201).json(newReview);
		}

		const newReview = await ReviewService.addReview({
			loginUserId,
			tourId,
			content,
			rating,
		});

		res.status(201).json(newReview);
	} catch (err) {
		next(err);
	}
});

// 해당 랜드마크의 리뷰 목록 불러오기
reviewRouter.get("/review/:tourId/list", async (req, res, next) => {
	try {
		const tourId = req.params.tourId;
		const reviews = await ReviewService.getReviews({ tourId });

		res.status(200).json(reviews);
	} catch (err) {
		next(err);
	}
});

// 리뷰 수정하기
reviewRouter.put("/review/:id", s3Multi(), async (req, res, next) => {
	try {
		if (is.emptyObject(req.body)) {
			throw new Error("system.error.badRequest");
		}

		const loginUserId = req.currentUserId;
		const reviewId = req.params.id;

		let toUpdate = req.body;

		if (req.files) {
			const images = req.files.map(
				(image) => image.location.split("amazonaws.com/")[1]
			);
			toUpdate.saveFileName = images;
		}

		const editedReview = await ReviewService.setReview({
			loginUserId,
			reviewId,
			toUpdate,
		});

		res.status(201).json(editedReview);
	} catch (err) {
		next(err);
	}
});

// 리뷰 삭제하기
reviewRouter.delete("/review/:id", async (req, res, next) => {
	try {
		const loginUserId = req.currentUserId;
		const reviewId = req.params.id;

		const deleteResult = await ReviewService.deleteReview({
			loginUserId,
			reviewId,
		});

		res.status(200).send(deleteResult);
	} catch (err) {
		next(err);
	}
});

export { reviewRouter };
