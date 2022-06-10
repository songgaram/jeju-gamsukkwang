import is from "@sindresorhus/is";

import { Router } from "express";
import { communityService } from "../services/communityService";
import { loginRequired } from "../middlewares/loginRequired";

const communityRouter = Router();

communiyRouter.get("/community", async (req, res, next) => {
	try {
		if (is.emptyObject(req.query)) {
			throw new Error("system.error.badRequest");
		}
		const page = req.query.page || 1;
		const limit = req.query.limit || 10;
		const head = req.query.head;

		const getArticles = {
			page,
			limit,
			head,
		};

		const articles = await communityService.getArticles({ getArticles });

		res.status(200).send(articles);
	} catch (err) {
		next(err);
	}
});

communityRouter.delete(
	"/community/:id",
	loginRequired,
	async (req, res, next) => {
		try {
			if (is.emptyObject(req.params)) {
				throw new Error("system.error.badRequest");
			}

			const articleId = req.params.id;

			const deletedArticle = await communityService.deleteArticle({
				articleId,
			});

			res.status(200).send(deletedArticle);
		} catch (err) {
			next(err);
		}
	}
);

export { communityRouter };
