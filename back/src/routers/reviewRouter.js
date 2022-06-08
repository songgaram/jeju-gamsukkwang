import is from "@sindresorhus/is";
import { loginRequired } from "../middlewares/loginRequired";
import { reviewService } from '../services/reviewService.js'
import { Router } from "express";

const reviewRouter = Router();
reviewRouter.use(loginRequired)

// 리뷰 작성하기
reviewRouter.post("/review/:id", async (req, res, next) => {
  try{
    if (is.emptyObject(req.body)) {
			throw new Error("system.error.badRequest");
		}

    const loginUserId = req.currentUserId
    const landmarkId = req.params.id
    const { content, rating } = req.body

    const newReview = await reviewService.addReview({ 
      loginUserId, 
      landmarkId,
      content, 
      rating
    })

    res.status(201).json(newReview)

  } catch(err){
    next(err)
  }
})

// 해당 랜드마크의 리뷰 목록 불러오기
reviewRouter.get("/review/:id", async (req, res, next) => {
  try{
    const landmarkId = req.params.id
    const reviews = await reviewService.getReviews({ landmarkId })

    res.status(200).json(reviews)
  } catch(err){
    next(err)
  }
})

export { reviewRouter }