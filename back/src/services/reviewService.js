import { userModel, reviewModel } from "../db";
import Joi from "joi";

import { v4 as uuidv4 } from "uuid";

class ReviewService {
  static addReview = async ({ loginUserId, tourId, content, rating }) => {
    const propSchema = Joi.object().keys({
      loginUserId: Joi.string().trim().empty().required(),
      tourId: Joi.string().trim().empty().required(),
      content: Joi.string().trim().empty().required(),
      rating: Joi.number().integer().min(1).max(5).required(),
    });

    await propSchema.validateAsync({
      loginUserId,
      tourId,
      content,
      rating,
    });

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
  static getReviews = async ({ getReviews }) => {
    const propSchema = Joi.object().keys({
      tourId: Joi.string().trim().empty().required(),
      page: Joi.number().integer().min(1).required(),
      limit: Joi.number().integer().min(1).required(),
    });

    await propSchema.validateAsync(getReviews);

    const reviews = await reviewModel.findByTourId({ getReviews });
    return reviews;
  };

  // 리뷰 요약 정보 불러오기
  static getReviewInfo = async ({ tourId }) => {
    const propSchema = Joi.object().keys({
      tourId: Joi.string().trim().empty().required(),
    });

    await propSchema.validateAsync({ tourId });

    const reviewInfo = await reviewModel.findReviewData({ tourId });
    return reviewInfo;
  };

  // 본인 리뷰인지 확인하고 수정하기
  static setReview = async ({ loginUserId, reviewId, toUpdate }) => {
    const propSchema = Joi.object().keys({
      loginUserId: Joi.string().trim().empty().required(),
      reviewId: Joi.string().trim().empty().required(),
      toUpdate: Joi.object({
        content: Joi.string().trim().empty().required(),
        rating: Joi.number().integer().min(1).max(5).required(),
      }).required(),
    });

    await propSchema.validateAsync({ loginUserId, reviewId, toUpdate });

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
    const propSchema = Joi.object().keys({
      loginUserId: Joi.string().trim().empty().required(),
      reviewId: Joi.string().trim().empty().required(),
    });

    await propSchema.validateAsync({ loginUserId, reviewId });

    const currentReview = await reviewModel.findById({ reviewId });

    if (!currentReview) {
      throw new Error("system.error.noReview");
    }

    const { userId } = currentReview;

    // 현재 로그인한 사용자와 리뷰 작성자가 같아야 수정 가능
    if (userId === loginUserId) {
      await reviewModel.deleteById({ reviewId });

      return "system.success";
    } else {
      throw new Error("system.error.unAuthorized");
    }
  };
}

export { ReviewService };
