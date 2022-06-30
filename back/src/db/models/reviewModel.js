import { Review } from "../schemas/review.js";

export const reviewModel = {
  // 리뷰 작성하기
  create: async ({ newReview }) => {
    const createdNewReview = await Review.create(newReview);
    return createdNewReview;
  },

  // 해당 랜드마크에 대한 리뷰를 이미 작성했던 사람인지 확인
  isPosted: async ({ tourId, userId }) => {
    const isPosted = Review.exists({
      $and: [{ tourId }, { userId }],
    });
    return isPosted;
  },

  // 해당 랜드마크의 총 리뷰수, 평점 평균, 리뷰 목록 불러오기
  findByTourId: async ({ getReviews }) => {
    const { tourId, page, limit } = getReviews;
    const total = await Review.countDocuments({ tourId });
    const offset = (page - 1) * limit;
    let totalPage = Math.floor(total / limit);

    if (total % limit !== 0) {
      totalPage = Math.floor(total / limit) + 1;
    }

    const reviews = await Review.find({ tourId })
      .limit(limit)
      .skip(offset)
      .sort({ createdAt: -1 }); //리뷰 목록 최신순으로

    return {
      total,
      totalPage,
      reviews,
    };
  },

  // tourId로 리뷰 관련 정보 가져오기
  findReviewData: async ({ tourId }) => {
    const calc = await Review.aggregate([
      { $match: { tourId } },
      { $group: { _id: null, avg: { $avg: "$rating" }, cnt: { $sum: 1 } } },
    ]);

    if (calc.length === 0) {
      const newObj = {
        cnt: 0,
        avg: 0,
      };
      calc.push(newObj);
    }

    const totalReview = calc[0].cnt; // 총 리뷰 수
    const avgRating = calc[0].avg.toFixed(1); // 총 리뷰 평점의 평균 (소수점 첫째자리까지 반올림)

    // _id: 별점(5, 4, 3, 2, 1), cnt: 해당 별점의 리뷰 개수
    // * 예시. [ { _id: 5, cnt: 1 }, { _id: 2, cnt: 2 } ]
    const starCount = await Review.aggregate([
      { $match: { tourId } },
      { $group: { _id: "$rating", cnt: { $sum: 1 } } },
    ]);

    const starDic = Object.assign({}, ...starCount.map((x) => ({[x._id]: x.cnt})))

    const starRating = [];

    for (let i = 5; i > 0; i--) {

      let starObj = {
        star: i,
        reviews: starDic[i] ?? 0,
      };
      starRating.push(starObj);
    }

    return {
      totalReview,
      avgRating,
      starRating,
    };
  },

  // reviewId로 리뷰 정보 찾기
  findById: async ({ reviewId }) => {
    const review = await Review.findOne({ id: reviewId });
    return review;
  },

  // 리뷰 수정하기
  update: async ({ reviewId, data }) => {
    const filter = { id: reviewId };
    const update = { $set: data };
    const option = { returnOriginal: false };

    const updatedReview = await Review.findOneAndUpdate(filter, update, option);
    return updatedReview;
  },

  // 리뷰 삭제하기
  deleteById: async ({ reviewId }) => {
    const deleteResult = await Review.deleteOne({ id: reviewId });
    return deleteResult;
  },
};
