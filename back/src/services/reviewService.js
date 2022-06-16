import { db, userModel, reviewModel } from "../db";

import { v4 as uuidv4 } from "uuid";

class ReviewService {
	static addReview = async ({
		loginUserId,
		tourId,
		content,
		rating,
		images,
	}) => {
		const user = await userModel.findById({ userId: loginUserId });
		const userNickName = user.nickname;
		const id = uuidv4();

		const newReview = {
			id,
			tourId,
			userId: loginUserId,
			userNickName,
			content,
			rating,
			saveFileName: images,
		};

		// 이미 리뷰를 쓴 상태라면 { _id } 객체를 반환, 아니라면 null을 반환
		const didPostReview = await reviewModel.isPosted({
			tourId,
			userId: loginUserId,
		});

		if (didPostReview) {
			throw new Error("system.error.alreadyPosting");
		}

		const createdNewReview = await reviewModel.create({ newReview });
		return createdNewReview;
	};

	// 리뷰 목록 불러오기
	static getReviews = async ({ tourId }) => {
		const reviews = await reviewModel.findByTourId({ tourId });
		return reviews;
	};

	// 본인 리뷰인지 확인하고 수정하기
	static setReview = async ({ loginUserId, reviewId, toUpdate }) => {
		const currentReview = await reviewModel.findById({ reviewId });

		if (!currentReview) {
			throw new Error("system.error.noReview");
		}

		const userId = currentReview.userId;

		// 현재 로그인한 사용자와 리뷰 작성자가 같아야 수정 가능
		if (userId === loginUserId) {
			const updatedReview = await reviewModel.update({
				reviewId,
				data: toUpdate,
			});
			return updatedReview;
		} else {
			throw new Error("system.error.unAuthorized");
		}
	};

	// 리뷰 삭제하기
	static deleteReview = async ({ loginUserId, reviewId }) => {
		const currentReview = await reviewModel.findById({ reviewId });

		if (!currentReview) {
			throw new Error("system.error.noReview");
		}

		const userId = currentReview.userId;

		// 현재 로그인한 사용자와 리뷰 작성자가 같아야 수정 가능
		if (userId === loginUserId) {
			const isDeleted = await reviewModel.deleteById({ reviewId });

			if (isDeleted.deletedCount !== 1) {
				throw new Error("system.error.fail");
			}

			return "system.success";
		} else {
			throw new Error("system.error.unAuthorized");
		}
	};
}

export { ReviewService };
