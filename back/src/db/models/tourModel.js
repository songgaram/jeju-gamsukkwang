import { Landmark } from "../schemas/landmark";

export const tourModel = {
	findByEnTitle: async ({ enTitle }) => {
		const landmark = await Landmark.findOne({ enTitle });
		return landmark;
	},

	isLandmarkExist: async ({ enTitle }) => {
		const isLandmarkExist = await Landmark.exists({ enTitle });

		return isLandmarkExist ? true : false;
	},

	addLike: async ({ enTitle, currentUserId }) => {
		const filter = { enTitle };
		const update = {
			$inc: { likeCount: 1 },
			$push: { likedUsers: currentUserId },
		};
		const option = { returnOriginal: false };

		const addLikeCount = await Landmark.findOneAndUpdate(
			filter,
			update,
			option
		);

		return addLikeCount;
	},

	removeLike: async ({ enTitle, currentUserId }) => {
		const filter = { enTitle };
		const update = {
			$inc: { likeCount: -1 },
			$pull: { likedUsers: currentUserId },
		};
		const option = { returnOriginal: false };

		const removeLikeCount = await Landmark.findOneAndUpdate(
			filter,
			update,
			option
		);

		return removeLikeCount;
	},
};
