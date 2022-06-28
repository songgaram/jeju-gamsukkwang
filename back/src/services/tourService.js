import { db, tourModel } from "../db";
import * as Joi from 'joi'

class TourService {
	static getAllLandmarks = async () => {
		const allLandmarks = await tourModel.findAll({});

		return allLandmarks;
	};

	static getLandmark = async ({ id }) => {
		// 데이터의 유효성 체크
		const tourIdValidator = Joi.string().trim().empty().required()
		await tourIdValidator.validateAsync(id)

		const isLandmarkExist = await tourModel.isLandmarkExist({ id });
		if (!isLandmarkExist) {
			throw new Error("system.error.noLandmark");
		}

		const landmark = await tourModel.findById({ id });

		return landmark;
	};

	static addLike = async ({ id, currentUserId }) => {
		// 데이터의 유효성 체크
		const dataValidator = Joi.object({
			id: Joi.string().trim().empty().required(),
			currentUserId: Joi.string().trim().empty().required()
		})
		await dataValidator.validateAsync({ id, currentUserId })

		const isLandmarkExist = await tourModel.isLandmarkExist({ id });
		if (!isLandmarkExist) {
			throw new Error("system.error.noLandmark");
		}

		const didUserLiked = await tourModel.didUserLiked({
			id,
			currentUserId,
		});

		// didUserLiked가 무언가를 반환할 때 에러를 발생
		if (didUserLiked) {
			throw new Error("system.error.alreadyLiked");
		}

		const addLiketoLandmark = tourModel.addLike({
			id,
			currentUserId,
		});

		return addLiketoLandmark;
	};

	static removeLike = async ({ id, currentUserId }) => {
		// 데이터의 유효성 체크
		const dataValidator = Joi.object({
			id: Joi.string().trim().empty().required(),
			currentUserId: Joi.string().trim().empty().required()
		})
		await dataValidator.validateAsync({ id, currentUserId })

		const isLandmarkExist = await tourModel.isLandmarkExist({ id });
		if (!isLandmarkExist) {
			throw new Error("system.error.noLandmark");
		}

		const didUserLiked = await tourModel.didUserLiked({
			id,
			currentUserId,
		});

		// didUserLiked가 무언가를 반환하지 않을 때 에러를 발생
		if (!didUserLiked) {
			throw new Error("system.error.noLiked");
		}

		const removeLikefromLandmark = tourModel.removeLike({
			id,
			currentUserId,
		});

		return removeLikefromLandmark;
	};

	static sortByLiked = async ({}) => {
		const sortLandmarks = await tourModel.sortByLiked({});

		return sortLandmarks;
	};

	static sortByReviews = async ({}) => {
		const sortLandmarks = await tourModel.sortByReviews({});

		return sortLandmarks;
	};

	static sortByRating = async ({}) => {
		const sortLandmarks = await tourModel.sortByRating({});

		return sortLandmarks;
	};
}

export { TourService };
