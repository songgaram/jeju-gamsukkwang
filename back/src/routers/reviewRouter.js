import Joi from "joi";

import { loginRequired } from "../middlewares/";
import { ReviewService } from "../services/ReviewService.js";
import { s3Multi } from "../middlewares/multerS3";
import { Router } from "express";

const reviewRouter = Router();

// 리뷰 작성하기
reviewRouter.post(
	"/review",
	loginRequired,
	s3Multi(),
	async (req, res, next) => {
		try {
			const bodySchema = Joi.object().keys({
				title: Joi.string().required(),
				content: Joi.string().required(),
				head: Joi.string().valid("free", "info", "question").required(),
				imgFile: Joi.any(),
			});

			await bodySchema.validateAsync(req.body);

			const loginUserId = req.currentUserId;
			const { tourId, content, rating } = req.body;
			const images = req.files.map(
				(image) => image.location.split("amazonaws.com/")[1]
			);

			const newReview = await ReviewService.addReview({
				loginUserId,
				tourId,
				content,
				rating,
				images,
			});

			res.status(201).json(newReview);
			return;
			return;
		} catch (err) {
			next(err);
		}
	}
);

// 해당 랜드마크의 리뷰 목록 불러오기
reviewRouter.get("/review/:tourId/list", async (req, res, next) => {
	try {
		const paramSchema = Joi.object().keys({
			tourId: Joi.string().required(),
		});

		const querySchema = Joi.object().keys({
			page: Joi.number(),
			limit: Joi.number(),
		});

		await paramSchema.validateAsync(req.params);
		await querySchema.validateAsync(req.query);

		const page = +req.query.page || 1;
		const limit = +req.query.limit || 10;
		const { tourId } = req.params;

		const getReviews = {
			tourId,
			page,
			limit,
		};

		const reviews = await ReviewService.getReviews({ getReviews });

		res.status(200).json(reviews);
		return;
	} catch (err) {
		next(err);
	}
});

// 해당 랜드마크 리뷰 관련 요약 데이터 가져오기
reviewRouter.get("/review/:tourId/info", async (req, res, next) => {
	try {
		const paramSchema = Joi.object().keys({
			tourId: Joi.string().required(),
		});

		await paramSchema.validateAsync(req.params);

		const { tourId } = req.params;
		const reviewInfo = await ReviewService.getReviewInfo({ tourId });

		res.status(200).json(reviewInfo);
		return;
	} catch (err) {
		next(err);
	}
});

// 리뷰 수정하기
reviewRouter.put(
	"/review/:id",
	loginRequired,
	s3Multi(),
	async (req, res, next) => {
		try {
			const paramSchema = Joi.object().keys({
				id: Joi.string().required(),
			});

			await paramSchema.validateAsync(req.params);

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
			return;
		} catch (err) {
			next(err);
		}
	}
);

// 리뷰 삭제하기
reviewRouter.delete("/review/:id", loginRequired, async (req, res, next) => {
	try {
		const paramSchema = Joi.object().keys({
			id: Joi.string().required(),
		});

		await paramSchema.validateAsync(req.params);

		const loginUserId = req.currentUserId;
		const reviewId = req.params.id;

		const deleteResult = await ReviewService.deleteReview({
			loginUserId,
			reviewId,
		});

		res.status(200).send(deleteResult);
		return;
	} catch (err) {
		next(err);
	}
});

export { reviewRouter };
