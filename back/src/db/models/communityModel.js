import { Community } from "../schemas/community";

export const communityModel = {
	create: async ({ newArticle }) => {
		const createdNewArticle = await Community.create(newArticle);
		return createdNewArticle;
	},

	deleteById: async ({ articleId }) => {
		const deletedArticle = await Community.deleteOne({ id: articleId });

		return deletedArticle;
	},

	findById: async ({ articleId }) => {
		const foundArticle = await Community.findOne({ id: articleId });

		return foundArticle;
	},

	update: async ({ articleId, data }) => {
		const filter = { id: articleId };
		const update = { $set: data };
		const option = { returnOriginal: false };
		const updatedArticle = await Community.findOneAndUpdate(
			filter,
			update,
			option
		);
		return updatedArticle;
	},

	findAll: async ({ getArticles }) => {
		const total = await Community.countDocuments({});

		const limit = getArticles.limit;
		const offset = (getArticles.page - 1) * limit;

		const articles = await Community.find({}).limit(limit).skip(offset);

		const sendArticles = {
			total: total,
			articles,
		};

		return sendArticles;
	},

	findHead: async ({ getArticles }) => {
		const head = getArticles.head;

		const total = await Community.countDocuments({ head });

		const limit = getArticles.limit;
		const offset = (getArticles.page - 1) * limit;

		const articles = await Community.find({ head }).limit(limit).skip(offset);

		const sendArticles = {
			total: total,
			articles,
		};

		return sendArticles;
	},
	addLike: async ({ articleId, currentUserId }) => {
		const filter = { id: articleId };
		const update = {
			$push: { likedUsers: currentUserId },
		};
		const option = { returnOriginal: false };

		const addLikeCount = await Community.findOneAndUpdate(
			filter,
			update,
			option
		);

		return addLikeCount;
	},

	removeLike: async ({ articleId, currentUserId }) => {
		const filter = { id: articleId };
		const update = {
			$pull: { likedUsers: currentUserId },
		};
		const option = { returnOriginal: false };

		const removeLikeCount = await Community.findOneAndUpdate(
			filter,
			update,
			option
		);

		return removeLikeCount;
	},

	didUseLike: async ({ articleId, currentUserId }) => {
		const didUseLike = await Community.exists({
			$and: [{ id: articleId }, { likedUsers: currentUserId }],
		});

		return didUseLike;
	},

	isArticleExist: async ({ articleId }) => {
		const isArticleExist = await Community.exists({ id: articleId });

		return isArticleExist;
	},
};
