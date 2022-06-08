import is from "@sindresorhus/is";
import { loginRequired } from "../middlewares/loginRequired";
import { reviewService } from '../services/reviewService.js'
import { Router } from "express";

const reviewRouter = Router();
reviewRouter.use(loginRequired)

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

export { reviewRouter }