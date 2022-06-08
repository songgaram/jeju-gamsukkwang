import { Review } from '../schemas/review.js';

export const reviewModel = {
  // 리뷰 작성하기
  create: async ({ newReview }) => {
    const createdNewReview = await Review.create(newReview)
    return createdNewReview
  },

  // 해당 랜드마크에 대한 리뷰를 이미 작성했던 사람인지 확인
  IsPosted: async ({ landmarkId, writerId }) => {
    const IsPosted = Review.exists({ 
      $and: [{ landmarkId }, { writerId } ]
    })
    return IsPosted
  },




};