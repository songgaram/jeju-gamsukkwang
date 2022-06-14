import { Tour } from "../schemas/tour";

export const tourModel = {
	findAll: async () => {
		const allLandmarks = await Tour.find({});
		return allLandmarks;
	},

	findById: async ({ id }) => {
		const landmark = await Tour.findOne({ id });
		return landmark;
	},

	isLandmarkExist: async ({ id }) => {
		const isLandmarkExist = await Tour.exists({ id });

		return isLandmarkExist;
	},

	addLike: async ({ id, currentUserId }) => {
		const filter = { id };
		const update = {
			$inc: { likeCount: 1 },
			$push: { likedUsers: currentUserId },
		};
		const option = { returnOriginal: false };

		const addLikeCount = await Tour.findOneAndUpdate(filter, update, option);

		return addLikeCount;
	},

	removeLike: async ({ id, currentUserId }) => {
		const filter = { id };
		const update = {
			$inc: { likeCount: -1 },
			$pull: { likedUsers: currentUserId },
		};
		const option = { returnOriginal: false };

		const removeLikeCount = await Tour.findOneAndUpdate(filter, update, option);

		return removeLikeCount;
	},

	didUserLiked: async ({ id, currentUserId }) => {
		const didUserLiked = await Tour.exists({
			$and: [{ id }, { likedUsers: currentUserId }],
		});

		return didUserLiked;
	},

	sortByLiked: async ({}) => {
		const sortByLiked = await Tour.find({}).sort({ likeCount: -1 });

		return sortByLiked;
	},
};
