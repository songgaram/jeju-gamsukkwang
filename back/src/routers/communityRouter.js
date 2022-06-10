import is from "@sindresorhus/is";

import { Router } from "express";
import { communityService } from "../services/communityService";
import { loginRequired } from "../middlewares/loginRequired";

const communityRouter = Router();
communityRouter.use(loginRequired)

// 게시글 작성
communityRouter.post("/community", async (req, res, next) => {
  try{
    if(is.emptyObject(req.body)){
      throw new Error("system.error.badRequest");
    }

    const loginUserId = req.currentUserId
    const { title, content } = req.body

    const newArticle = await communityService.addArticle({ 
      loginUserId,
      title, content
    })

    res.status(201).json(newArticle)
  } catch(err) {
    next(err)
  }
})

// 게시글 수정
communityRouter.put("/community/:id", async (req, res, next) => {
  try{
    if(is.emptyObject(req.body)){
      throw new Error("system.error.badRequest")
    }

    const loginUserId = req.currentUserId
    const articleId = req.params.id
    const toUpdate = req.body

    const editedArticle = await communityService.setArticle({ 
      loginUserId,
      articleId, 
      toUpdate
    })

    res.status(201).json(editedArticle)
  } catch(err){
    next(err)
  }
})

// 특정 게시글 불러오기
communityRouter.get("/community/:id", async (req, res, next) => {
  try{
    const articleId = req.params.id
    const article = await communityService.getArticle({ articleId })

    res.status(200).json(article)
  } catch(err){
    next(err)
  }
})

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
