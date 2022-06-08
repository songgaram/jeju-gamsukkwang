import { Tour } from "../schemas/tour";

export const tourModel = {
	findByEnTitle: async ({ enTitle }) => {
		const landmark = await Tour.findOne({ enTitle });
		return landmark;
	},

	isLandmarkExist: async ({ enTitle }) => {
		const isLandmarkExist = await Tour.exists({ enTitle });

		return isLandmarkExist ? true : false;
	},

	addLike: async ({ enTitle, currentUserId }) => {
		const filter = { enTitle };
		const update = {
			$inc: { likeCount: 1 },
			$push: { likedUsers: currentUserId },
		};
		const option = { returnOriginal: false };

		const addLikeCount = await Tour.findOneAndUpdate(filter, update, option);

		return addLikeCount;
	},

	removeLike: async ({ enTitle, currentUserId }) => {
		const filter = { enTitle };
		const update = {
			$inc: { likeCount: -1 },
			$pull: { likedUsers: currentUserId },
		};
		const option = { returnOriginal: false };

		const removeLikeCount = await Tour.findOneAndUpdate(filter, update, option);

		return removeLikeCount;
	},

	didUseLike: async ({ enTitle, currentUserId }) => {
		const landmark = await Tour.findOne({ enTitle });
		const likedUsers = landmark.likedUsers;
		if (likedUsers.length > 0) {
			const result = likedUsers.filter((v) => v === currentUserId);

			return result.length > 0 ? true : false;
		} else if (likedUsers.length === 0) {
			return false;
		}
	},
};
