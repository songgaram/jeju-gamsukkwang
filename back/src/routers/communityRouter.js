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



export { communityRouter };
