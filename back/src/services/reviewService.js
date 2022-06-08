import { reviewModel } from "../db/models/reviewModel.js";
import { userModel } from "../db/models/userModel.js";

class reviewService {
  static addReview = async ({ 
    loginUserId, 
    landmarkId,
    content, 
    rating 
  }) => {
    const user = await userModel.findById({ userId: loginUserId })
    const writerNickName = user.nickname

    const newReview = {
      landmarkId,
      writerId: loginUserId,
      writerNickName,
      content,
      rating,
    }

    // 이미 리뷰를 쓴 상태라면 { _id } 객체를 반환, 아니라면 null을 반환
    const didPostReview = await reviewModel.IsPosted({ landmarkId, writerId: loginUserId })

    if(didPostReview){
      throw new Error("system.error.alreadyPosting")
    }
    
    const createdNewReview = await reviewModel.create({ newReview })

    return createdNewReview
  }
}

export { reviewService }