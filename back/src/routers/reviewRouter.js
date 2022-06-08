import is from "@sindresorhus/is";
import { loginRequired } from "../middlewares/loginRequired";
import { reviewService } from '../services/reviewService.js'
import { Router } from "express";

const reviewRouter = Router();
reviewRouter.use(loginRequired)

// 리뷰 작성하기
reviewRouter.post("/review", async (req, res, next) => {
  try{
    if (is.emptyObject(req.body)) {
			throw new Error("system.error.badRequest");
		}

    const loginUserId = req.currentUserId
    const { landmarkId, content, rating } = req.body

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
reviewRouter.get("/review/:landmarkId/list", async (req, res, next) => {
  try{
    const landmarkId = req.params.landmarkId
    const reviews = await reviewService.getReviews({ landmarkId })

    res.status(200).json(reviews)
  } catch(err){
    next(err)
  }
})

// 리뷰 수정하기
reviewRouter.put("/review/:id", async (req, res, next) => {
  try{
    if (is.emptyObject(req.body)) {
			throw new Error("system.error.badRequest");
		}

    const loginUserId = req.currentUserId
    const reviewId = req.params.id
    const toUpdate = req.body

    const editedReview = await reviewService.setReview({
      loginUserId, 
      reviewId,
      toUpdate
    })

    res.status(201).json(editedReview)
  } catch(err) {
    next(err)
  }
})

export { reviewRouter }