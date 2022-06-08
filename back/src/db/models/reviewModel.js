import { Review } from '../schemas/review.js';

export const reviewModel = {
  // 리뷰 작성하기
  create: async ({ newReview }) => {
    const createdNewReview = await Review.create(newReview)
    return createdNewReview
  },

  IsPosted: async ({ writerId }) => {
    const IsPosted = Review.exists({ writerId })
    return IsPosted
  }


};