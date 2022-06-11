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

  // 해당 랜드마크의 총 리뷰수, 평점 평균, 리뷰 목록 불러오기
  findByLandmarkId: async ({ landmarkId }) => {
    const reviews = await Review.find({ landmarkId }).sort({ createdAt: -1 }) //리뷰 목록 최신순으로
    
    const calc = await Review.aggregate([
      { $match: { landmarkId } },
      { $group: { _id: null, avg: { $avg: "$rating" }, cnt: { $sum: 1 } }}
    ])

    const totalCount = calc[0].cnt // 총 리뷰 수
    const avgRating = calc[0].avg // 총 리뷰 평점의 평균
    
    const starCount = await Review.aggregate([
      { $match: { landmarkId } },
      { $group: { _id: "$rating", cnt: { $sum: 1 } }},
      { $sort : {"_id": -1}} // 별점 높은 것부터 순서대로 나오도록 함
    ])

    const star5 = starCount[0]?.cnt ?? 0
    const star4 = starCount[1]?.cnt ?? 0
    const star3 = starCount[2]?.cnt ?? 0
    const star2 = starCount[3]?.cnt ?? 0
    const star1 = starCount[4]?.cnt ?? 0

    return { totalCount, avgRating, star5, star4, star3, star2, star1, reviews}
  },

  // reviewId로 리뷰 정보 찾기
  findById: async ({ reviewId }) => {
    const review = await Review.findOne({ reviewId })
    return review
  },

  // 리뷰 수정하기
  update: async ({ reviewId, data }) => {
    const filter = { id: reviewId}
		const update = { $set: data };
		const option = { returnOriginal: false };

		const updatedReview = await Review.findOneAndUpdate(filter, update, option);
		return updatedReview;
  },

  // 리뷰 삭제하기
  deleteById: async ({ reviewId }) => {
    const deleteResult = await Review.deleteOne({ id: reviewId })
    return deleteResult
  }

};