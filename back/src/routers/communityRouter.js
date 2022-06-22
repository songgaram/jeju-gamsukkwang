import is from "@sindresorhus/is";
import Joi from "joi";

import { Router } from "express";
import { CommunityService } from "../services/CommunityService";
import { loginRequired } from "../middlewares/";
import { s3Multi } from "../middlewares/multerS3";

const communityRouter = Router();

// 게시글 작성
communityRouter.post(
  "/community",
  loginRequired,
  s3Multi(),
  async (req, res, next) => {
    try {
      const bodySchema = Joi.object().keys({
        title: Joi.string().trim().empty().required(),
        content: Joi.string().trim().empty().required(),
        head: Joi.string()
          .trim()
          .empty()
          .valid("free", "info", "question")
          .required(),
        imgFile: Joi.any(),
      });
      const idSchema = Joi.string().empty().required();

      await idSchema.validateAsync(req.currentUserId);
      await bodySchema.validateAsync(req.body);

      const loginUserId = req.currentUserId;
      const { title, content, head } = req.body;
      const images = req.files.map(
        (image) => image.location.split("amazonaws.com/")[1],
      );

      const newArticle = await CommunityService.addArticle({
        loginUserId,
        title,
        content,
        head,
        images,
      });

      res.status(201).json(newArticle);
    } catch (err) {
      next(err);
    }
  },
);

// 게시글 수정
communityRouter.put(
  "/community/:id",
  loginRequired,
  s3Multi(),
  async (req, res, next) => {
    try {
      const bodySchema = Joi.object().keys({
        title: Joi.string().trim().empty().required(),
        content: Joi.string().trim().empty().required(),
        head: Joi.string()
          .trim()
          .empty()
          .valid("free", "info", "question")
          .required(),
        imgFile: Joi.any(),
      });
      const idSchema = Joi.string().empty().required();

      await idSchema.validateAsync(req.currentUserId);
      await bodySchema.validateAsync(req.body);

      const loginUserId = req.currentUserId;
      const { id: articleId } = req.params;
      const { title, content, head } = req.body;

      let toUpdate = { title, content, head };

      if (req.files) {
        const images = req.files.map(
          (image) => image.location.split("amazonaws.com/")[1],
        );
        toUpdate.saveFileName = images;
        return;
      }

      const editedArticle = await CommunityService.setArticle({
        loginUserId,
        articleId,
        toUpdate,
      });

      res.status(201).json(editedArticle);
    } catch (err) {
      next(err);
    }
  },
);

// 특정 게시글 불러오기
communityRouter.get("/community/:id", loginRequired, async (req, res, next) => {
  try {
    const paramSchema = Joi.object().keys({
      id: Joi.string().trim().empty().required(),
    });

    await paramSchema.validateAsync(req.params);

    const { articleId } = req.params;
    const article = await CommunityService.getArticle({ articleId });

    res.status(200).json(article);
  } catch (err) {
    next(err);
  }
});

// 게시글 불러오기
communityRouter.get("/community", async (req, res, next) => {
  try {
    const querySchema = Joi.object().keys({
      page: Joi.number().integer().min(1),
      limit: Joi.number().integer().min(1),
      head: Joi.string().trim().empty().valid("", "free", "info", "question"),
    });

    await querySchema.validateAsync(req.query);

    const page = +req.query.page || 1;
    const limit = +req.query.limit || 10;
    const head = req.query.head;

    const getArticles = {
      page,
      limit,
      head,
    };

    const articles = await CommunityService.getArticles({ getArticles });

    res.status(200).send(articles);
  } catch (err) {
    next(err);
  }
});

// 게시글 삭제
communityRouter.delete(
  "/community/:id",
  loginRequired,
  async (req, res, next) => {
    try {
      const paramSchema = Joi.object().keys({
        id: Joi.string().trim().empty().required(),
      });
      const idSchema = Joi.string().empty().required();

      await idSchema.validateAsync(req.currentUserId);
      await paramSchema.validateAsync(req.params);

      const loginUserId = req.currentUserId;
      const { id: articleId } = req.params;

      const deletedArticle = await CommunityService.deleteArticle({
        articleId,
        loginUserId,
      });

      res.status(200).send(deletedArticle);
    } catch (err) {
      next(err);
    }
  },
);

// 게시글 좋아요 추가
communityRouter.put(
  "/community/:id/like",
  loginRequired,
  async (req, res, next) => {
    try {
      const paramSchema = Joi.object().keys({
        id: Joi.string().trim().empty().required(),
      });
      const idSchema = Joi.string().empty().required();

      await idSchema.validateAsync(req.currentUserId);
      await paramSchema.validateAsync(req.params);

      // req에서 데이터 가져오기
      const userId = req.currentUserId;
      const { id: articleId } = req.params;

      const addLiketoArticle = await CommunityService.addLike({
        articleId,
        currentUserId: userId,
      });

      res.status(200).json(addLiketoArticle);
    } catch (err) {
      next(err);
    }
  },
);

// 게시글 싫어요 추가
communityRouter.put(
  "/community/:id/dislike",
  loginRequired,
  async (req, res, next) => {
    try {
      const paramSchema = Joi.object().keys({
        id: Joi.string().trim().empty().required(),
      });
      const idSchema = Joi.string().empty().required();

      await idSchema.validateAsync(req.currentUserId);
      await paramSchema.validateAsync(req.params);

      // req에서 데이터 가져오기
      const userId = req.currentUserId;
      const { id: articleId } = req.params;

      const removeLikefromArticle = await CommunityService.removeLike({
        articleId,
        currentUserId: userId,
      });

      res.status(200).json(removeLikefromArticle);
    } catch (err) {
      next(err);
    }
  },
);

export { communityRouter };
