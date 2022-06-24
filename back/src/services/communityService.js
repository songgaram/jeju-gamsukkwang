import { v4 as uuidv4 } from "uuid";
import Joi from "joi";

import { userModel, communityModel } from "../db";

class CommunityService {
  // 전체 혹은 모든 말머리 게시글 정보 불러오기
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

  // 게시글 삭제
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

  // 게시글 작성
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

  // 게시글 수정
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

    if (userId !== loginUserId) {
      throw new Error("system.error.unAuthorized");
    }

    const updatedArticle = await communityModel.update({
      articleId,
      data: toUpdate,
    });
    return updatedArticle;
  };

  // 특정 게시글 정보 가져오기
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

  // 해당 게시글에 좋아요 추가
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

    // 좋아요는 한 사용자가 게시글 당 1회만 가능
    const didUserLiked = await communityModel.didUserLiked({
      articleId,
      currentUserId,
    });
    if (didUserLiked) {
      throw new Error("system.error.alreadyLiked");
    }

    const addLiketoArticle = communityModel.addLike({
      articleId,
      currentUserId,
    });

    return addLiketoArticle;
  };

  // 해당 게시글 좋아요 삭제
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

    // 좋아요를 하지 않으면 좋아요를 삭제할 수 없음
    const didUserLiked = await communityModel.didUserLiked({
      articleId,
      currentUserId,
    });
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
