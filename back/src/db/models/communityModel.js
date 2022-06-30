import { Community } from "../schemas/community";
import Joi from "joi";

export const communityModel = {
  create: async ({ newArticle }) => {
    const propSchema = Joi.object().keys({
      id: Joi.string().trim().empty().required(),
      userId: Joi.string().trim().empty().required(),
      userNickName: Joi.string().trim().empty().required(),
      title: Joi.string().trim().empty().required(),
      content: Joi.string().trim().empty().required(),
      head: Joi.string()
        .trim()
        .empty()
        .valid("free", "info", "question")
        .required(),
      saveFileName: Joi.any(),
    });
    await propSchema.validateAsync(newArticle);

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
    const propSchema = Joi.object().keys({
      articleId: Joi.string().trim().empty().required(),
      data: Joi.object({
        title: Joi.string().trim().empty().required(),
        content: Joi.string().trim().empty().required(),
        head: Joi.string().valid("free", "info", "question").required(),
        saveFileName: Joi.any(),
      }).required(),
    });
    await propSchema.validateAsync({ articleId, data });

    const filter = { id: articleId };
    const update = { $set: data };
    const option = { returnOriginal: false };
    const updatedArticle = await Community.findOneAndUpdate(
      filter,
      update,
      option,
    );
    return updatedArticle;
  },

  findAll: async ({ getArticles }) => {
    const propSchema = Joi.object().keys({
      page: Joi.number().integer().min(1).required(),
      limit: Joi.number().integer().min(1).required(),
      head: Joi.string().valid(""),
    });

    await propSchema.validateAsync(getArticles);

    const total = await Community.countDocuments({});

    const limit = getArticles.limit;
    const offset = (getArticles.page - 1) * limit;
    let totalPage = Math.floor(total / limit);

    if (total % limit !== 0) {
      totalPage = Math.floor(total / limit) + 1;
    }

    const articles = await Community.find({})
      .limit(limit)
      .skip(offset)
      .sort({ createdAt: -1 });

    const sendArticles = {
      total,
      totalPage,
      articles,
    };

    return sendArticles;
  },

  findHead: async ({ getArticles }) => {
    const propSchema = Joi.object().keys({
      page: Joi.number().integer().min(1).required(),
      limit: Joi.number().integer().min(1).required(),
      head: Joi.string().valid("free", "info", "question"),
    });

    await propSchema.validateAsync(getArticles);

    const { head } = getArticles;

    const total = await Community.countDocuments({ head });

    const limit = getArticles.limit;
    const offset = (getArticles.page - 1) * limit;
    let totalPage = 0;

    totalPage = Math.floor(total / limit);

    if (total % limit !== 0) {
      totalPage = Math.floor(total / limit) + 1;
    }

    const articles = await Community.find({ head }).limit(limit).skip(offset);

    const sendArticles = {
      total,
      totalPage,
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
      option,
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
      option,
    );

    return removeLikeCount;
  },

  didUserLiked: async ({ articleId, currentUserId }) => {
    const didUserLiked = await Community.exists({
      $and: [{ id: articleId }, { likedUsers: currentUserId }],
    });

    return didUserLiked;
  },

  isArticleExist: async ({ articleId }) => {
    const isArticleExist = await Community.exists({ id: articleId });

    return isArticleExist;
  },
};
