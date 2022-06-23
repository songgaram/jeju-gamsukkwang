import { v4 as uuidv4 } from "uuid";
import Joi from "joi";

import { userModel, communityModel } from "../db";

class CommunityService {
  static getArticles = async ({ getArticles }) => {
    const propSchema = Joi.object().keys({
      page: Joi.number().integer().min(1).required(),
      limit: Joi.number().integer().min(1).required(),
      head: Joi.string().valid("", "free", "info", "question"),
    });

    await propSchema.validateAsync(getArticles);

    if (!getArticles.head) {
      const result = await communityModel.findAll({ getArticles });

      if (result.total === 0) {
        throw new Error("system.error.noArticles");
      }

      return result;
    }
    const result = await communityModel.findHead({ getArticles });

    if (result.total === 0) {
      throw new Error("system.error.noArticles");
    }

    return result;
  };

  static deleteArticle = async ({ loginUserId, articleId }) => {
    const propSchema = Joi.object().keys({
      loginUserId: Joi.string().trim().empty().required(),
      articleId: Joi.string().trim().empty().required(),
    });

    await propSchema.validateAsync({ loginUserId, articleId });

    const currentArticle = await communityModel.findById({ articleId });
    if (!currentArticle) {
      throw new Error("system.error.noArticle");
    }

    const { userId } = currentArticle;

    if (userId !== loginUserId) {
      throw new Error("system.error.unAuthorized");
    }

    try {
      await communityModel.deleteById({ articleId });

      return "system.success";
    } catch (err) {
      throw new Error("system.error.fail");
    }
  };

  static addArticle = async ({ loginUserId, title, content, head, images }) => {
    const propSchema = Joi.object().keys({
      loginUserId: Joi.string().trim().empty().required(),
      title: Joi.string().trim().empty().required(),
      content: Joi.string().trim().empty().required(),
      head: Joi.string()
        .trim()
        .empty()
        .valid("free", "info", "question")
        .required(),
      images: Joi.any(),
    });

    await propSchema.validateAsync({
      loginUserId,
      title,
      content,
      head,
      images,
    });

    const user = await userModel.findById({ userId: loginUserId });
    const { nickname: userNickName } = user;
    const id = uuidv4();

    const newArticle = {
      id,
      userId: loginUserId,
      userNickName,
      title,
      content,
      head,
      saveFileName: images,
    };

    const createdNewArticle = await communityModel.create({ newArticle });
    return createdNewArticle;
  };

  // 본인 게시글만 수정 가능
  static setArticle = async ({ loginUserId, articleId, toUpdate }) => {
    const propSchema = Joi.object().keys({
      loginUserId: Joi.string().trim().empty().required(),
      articleId: Joi.string().trim().empty().required(),
      toUpdate: Joi.object({
        title: Joi.string().trim().empty().required(),
        content: Joi.string().trim().empty().required(),
        head: Joi.string().valid("free", "info", "question").required(),
        saveFileName: Joi.any(),
      }).required(),
    });

    await propSchema.validateAsync({ loginUserId, articleId, toUpdate });

    const currentArticle = await communityModel.findById({ articleId });
    if (!currentArticle) {
      throw new Error("system.error.noArticle");
    }

    const { userId } = currentArticle;

    //현재 로그인한 사용자와 게시글 작성자가 같아야 수정 가능
    if (userId !== loginUserId) {
      throw new Error("system.error.unAuthorized");
    }

    const updatedArticle = await communityModel.update({
      articleId,
      data: toUpdate,
    });
    return updatedArticle;
  };

  static getArticle = async ({ articleId }) => {
    const propSchema = Joi.object().keys({
      articleId: Joi.string().trim().empty().required(),
    });

    await propSchema.validateAsync({ articleId });

    const article = await communityModel.findById({ articleId });

    if (!article) {
      throw new Error("system.error.noArticle");
    }

    return article;
  };

  static addLike = async ({ articleId, currentUserId }) => {
    const propSchema = Joi.object().keys({
      articleId: Joi.string().trim().empty().required(),
      currentUserId: Joi.string().trim().empty().required(),
    });

    await propSchema.validateAsync({ articleId, currentUserId });

    const isArticleExist = await communityModel.isArticleExist({ articleId });
    if (!isArticleExist) {
      throw new Error("system.error.noArticle");
    }

    const didUserLiked = await communityModel.didUserLiked({
      articleId,
      currentUserId,
    });

    // didUserLiked가 무언가를 반환할 때 에러를 발생
    if (didUserLiked) {
      throw new Error("system.error.alreadyLiked");
    }

    const addLiketoArticle = communityModel.addLike({
      articleId,
      currentUserId,
    });

    return addLiketoArticle;
  };

  static removeLike = async ({ articleId, currentUserId }) => {
    const propSchema = Joi.object().keys({
      articleId: Joi.string().trim().empty().required(),
      currentUserId: Joi.string().trim().empty().required(),
    });

    await propSchema.validateAsync({ articleId, currentUserId });

    const isArticleExist = await communityModel.isArticleExist({ articleId });
    if (!isArticleExist) {
      throw new Error("system.error.noArticle");
    }

    const didUserLiked = await communityModel.didUserLiked({
      articleId,
      currentUserId,
    });

    // didUserLiked가 무언가를 반환하지 않을 때 에러를 발생
    if (!didUserLiked) {
      throw new Error("system.error.noLiked");
    }

    const removeLikefromArticle = communityModel.removeLike({
      articleId,
      currentUserId,
    });

    return removeLikefromArticle;
  };
}

export { CommunityService };
