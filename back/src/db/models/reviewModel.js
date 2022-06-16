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
	findByTourId: async ({ tourId }) => {
		const reviews = await Review.find({ tourId }).sort({ createdAt: -1 }); //리뷰 목록 최신순으로

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

		let starRating = [];

		for (let i = 5; i > 0; i--) {
			// starCount에 없는 별점은 0으로 초기화
			let starObj = {
				star: 0,
				reviews: 0,
			};

			starObj.star = i;
			starCount.map((item) => {
				// starCount에서 해당하는 별점은 찾아서 각각 넣어주기
				if (item._id === i) {
					starObj.reviews = item?.cnt;
				}
			});

			starRating.push(starObj);
		}

		return {
			totalReview,
			avgRating,
			starRating,
			reviews,
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
