import { db, tourModel } from "../db";

class tourService {
	static getAllLandmarks = async () => {
		const allLandmarks = await tourModel.findAll({});

		return allLandmarks;
	};

	static getLandmark = async ({ id }) => {
		const isLandmarkExist = await tourModel.isLandmarkExist({ id });
		if (!isLandmarkExist) {
			throw new Error("system.error.noLandmark");
		}

		const landmark = await tourModel.findById({ id });

		return landmark;
	};

	static addLike = async ({ id, currentUserId }) => {
		const isLandmarkExist = await tourModel.isLandmarkExist({ id });
		if (!isLandmarkExist) {
			throw new Error("system.error.noLandmark");
		}

		const didUseLike = await tourModel.didUseLike({
			id,
			currentUserId,
		});

		// didUseLike가 무언가를 반환할 때 에러를 발생
		if (didUseLike) {
			throw new Error("system.error.alreadyLiked");
		}

		const addLiketoLandmark = tourModel.addLike({
			id,
			currentUserId,
		});

		return addLiketoLandmark;
	};

	static removeLike = async ({ id, currentUserId }) => {
		const isLandmarkExist = await tourModel.isLandmarkExist({ id });
		if (!isLandmarkExist) {
			throw new Error("system.error.noLandmark");
		}

		const didUseLike = await tourModel.didUseLike({
			id,
			currentUserId,
		});

		// didUseLike가 무언가를 반환하지 않을 때 에러를 발생
		if (!didUseLike) {
			throw new Error("system.error.noLiked");
		}

		const removeLikefromLandmark = tourModel.removeLike({
			id,
			currentUserId,
		});

		return removeLikefromLandmark;
	};
}

export { tourService };
