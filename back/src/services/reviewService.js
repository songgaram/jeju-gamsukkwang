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
  };

  // 리뷰 목록 불러오기
  static getReviews = async ({ landmarkId }) => {
    const reviews = await reviewModel.findByLandmarkId({ landmarkId })
    return reviews
  }

  // 본인 리뷰인지 확인하고 수정하기
  static setReview = async ({ 
    loginUserId, 
    reviewId,
    toUpdate
  }) => {
    const currentReview = await reviewModel.findById({ reviewId })

    if(!currentReview){
      throw new Error("system.error.noReview")
    }

    const writerId = currentReview.writerId

    // 현재 로그인한 사용자와 리뷰 작성자가 같아야 수정 가능
    if(writerId === loginUserId){
      const editedReview = await reviewModel.update({ reviewId, data: toUpdate })
      return editedReview
    }
    else {
      throw new Error("system.error.notEqualWithWriter")
    }
  }
}

export { reviewService }