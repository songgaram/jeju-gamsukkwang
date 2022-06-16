import is from "@sindresorhus/is";

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
			if (is.emptyObject(req.body)) {
				throw new Error("system.error.badRequest");
			}

			const loginUserId = req.currentUserId;
			const { title, content, head } = req.body;
			const images = req.files.map(
				(image) => image.location.split("amazonaws.com/")[1]
			);

			const newArticle = await CommunityService.addArticle({
				loginUserId,
				title,
				content,
				head,
				images,
			});

			res.status(201).json(newArticle);
			return;
		} catch (err) {
			next(err);
		}
	}
);

// 게시글 수정
communityRouter.put(
	"/community/:id",
	loginRequired,
	s3Multi(),
	async (req, res, next) => {
		try {
			if (is.emptyObject(req.body)) {
				throw new Error("system.error.badRequest");
			}

			const loginUserId = req.currentUserId;
			const articleId = req.params.id;
			const { title, content, head } = req.body;

			let toUpdate = { title, content, head };

			if (req.files) {
				const images = req.files.map(
					(image) => image.location.split("amazonaws.com/")[1]
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
			return;
		} catch (err) {
			next(err);
		}
	}
);

// 특정 게시글 불러오기
communityRouter.get("/community/:id", loginRequired, async (req, res, next) => {
	try {
		const articleId = req.params.id;
		const article = await CommunityService.getArticle({ articleId });

		res.status(200).json(article);
		return;
	} catch (err) {
		next(err);
	}
});

// 게시글 불러오기
communityRouter.get("/community", async (req, res, next) => {
	try {
		if (is.emptyObject(req.query)) {
			throw new Error("system.error.badRequest");
		}
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
		return;
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
			if (is.emptyObject(req.params)) {
				throw new Error("system.error.badRequest");
			}
			const loginUserId = req.currentUserId;
			const articleId = req.params.id;

			const deletedArticle = await CommunityService.deleteArticle({
				articleId,
				loginUserId,
			});

			res.status(200).send(deletedArticle);
			return;
		} catch (err) {
			next(err);
		}
	}
);

// 게시글 좋아요 추가
communityRouter.put(
	"/community/:id/like",
	loginRequired,
	async (req, res, next) => {
		try {
			if (is.emptyObject(req.params)) {
				throw new Error("system.error.noArticleId");
			}

			// req에서 데이터 가져오기
			const userId = req.currentUserId;
			const articleId = req.params.id;

			const addLiketoArticle = await CommunityService.addLike({
				articleId,
				currentUserId: userId,
			});

			res.status(200).json(addLiketoArticle);
			return;
		} catch (err) {
			next(err);
		}
	}
);

// 게시글 싫어요 추가
communityRouter.put(
	"/community/:id/dislike",
	loginRequired,
	async (req, res, next) => {
		try {
			if (is.emptyObject(req.params)) {
				throw new Error("system.error.noArticleId");
			}

			// req에서 데이터 가져오기
			const userId = req.currentUserId;
			const articleId = req.params.id;

			const removeLikefromArticle = await CommunityService.removeLike({
				articleId,
				currentUserId: userId,
			});

			res.status(200).json(removeLikefromArticle);
			return;
		} catch (err) {
			next(err);
		}
	}
);

export { communityRouter };
