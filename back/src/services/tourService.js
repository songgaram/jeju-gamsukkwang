import { db, tourModel } from "../db";

class tourService {
	static getLandmark = async ({ name }) => {
		const isLandmarkExist = await tourModel.isLandmarkExist({ enTitle: name });
		if (!isLandmarkExist) {
			throw new Error("system.error.noLandmark");
		}

		const landmark = await tourModel.findByEnTitle({ enTitle: name });

		return landmark;
	};

	static addLike = async ({ name, currentUserId }) => {
		const isLandmarkExist = await tourModel.isLandmarkExist({ enTitle: name });
		if (!isLandmarkExist) {
			throw new Error("system.error.noLandmark");
		}

		const didUseLike = await tourModel.didUseLike({
			enTitle: name,
			currentUserId,
		});
		if (didUseLike) {
			throw new Error("system.error.alreadyLiked");
		}

		const addLiketoLandmark = tourModel.addLike({
			enTitle: name,
			currentUserId,
		});

		return addLiketoLandmark;
	};

	static removeLike = async ({ name, currentUserId }) => {
		const isLandmarkExist = await tourModel.isLandmarkExist({ enTitle: name });
		if (!isLandmarkExist) {
			throw new Error("system.error.noLandmark");
		}

		const didUseLike = await tourModel.didUseLike({
			enTitle: name,
			currentUserId,
		});
		if (!didUseLike) {
			throw new Error("system.error.noLiked");
		}

		const removeLikefromLandmark = tourModel.removeLike({
			enTitle: name,
			currentUserId,
		});

		return removeLikefromLandmark;
	};
}

export { tourService };
