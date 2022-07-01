import Joi from "joi";
import { v4 as uuidv4 } from "uuid";

import { userModel, reviewModel } from "../db";

class ReviewService {
  // 리뷰 추가
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

    // 리뷰 작성은 랜드마크에 대한 인증을 한 사람만 가능
    const didAuth = await reviewModel.isStamped({
      user, tourId
    })
    if (!didAuth) {
      throw new Error("system.error.noAuthorized");
    }

    // 리뷰 작성은 한 사용자가 랜드마크 당 1개까지만 작성 가능
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

  // 해당 랜드마크의 전체 리뷰 목록 가져오기
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

  // 해당 랜드마크 리뷰 요약 정보 가져오기
  static getReviewInfo = async ({ tourId }) => {
    const propSchema = Joi.object().keys({
      tourId: Joi.string().trim().empty().required(),
    });

    await propSchema.validateAsync({ tourId });

    const reviewInfo = await reviewModel.findReviewData({ tourId });
    return reviewInfo;
  };

  // 리뷰 수정
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

  // 리뷰 삭제
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

    if (userId === loginUserId) {
      await reviewModel.deleteById({ reviewId });

      return "system.success";
    } else {
      throw new Error("system.error.unAuthorized");
    }
  };
}

export { ReviewService };
