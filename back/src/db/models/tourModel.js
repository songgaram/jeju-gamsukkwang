import { Tour } from "../schemas/tour";
import { reviewModel } from "./reviewModel";

export const tourModel = {
  findAll: async () => {
    const allLandmarks = await Tour.find({});
    return allLandmarks;
  },

  findById: async ({ id }) => {
    const landmark = await Tour.findOne({ id });
    return landmark;
  },

  isLandmarkExist: async ({ id }) => {
    const isLandmarkExist = await Tour.exists({ id });

    return isLandmarkExist;
  },

  addLike: async ({ id, currentUserId }) => {
    const filter = { id };
    const update = {
      $inc: { likeCount: 1 },
      $push: { likedUsers: currentUserId },
    };
    const option = { returnOriginal: false };

    const addLikeCount = await Tour.findOneAndUpdate(filter, update, option);

    return addLikeCount;
  },

  removeLike: async ({ id, currentUserId }) => {
    const filter = { id };
    const update = {
      $inc: { likeCount: -1 },
      $pull: { likedUsers: currentUserId },
    };
    const option = { returnOriginal: false };

    const removeLikeCount = await Tour.findOneAndUpdate(filter, update, option);

    return removeLikeCount;
  },

  didUserLiked: async ({ id, currentUserId }) => {
    const didUserLiked = await Tour.exists({
      $and: [{ id }, { likedUsers: currentUserId }],
    });

    return didUserLiked;
  },

  sortByLiked: async ({}) => {
    const sortByLiked = await Tour.find(
      {},
      { _id: 0, id: 1, krTitle: 1, likeCount: 1, image: 1 },
    ).sort({ likeCount: -1 });

    return sortByLiked;
  },

  sortByReviews: async ({}) => {
    const tourIds = await Tour.find(
      {},
      { _id: 0, id: 1, krTitle: 1, image: 1 },
    );
    let newArray = [];

    for (let i = 0; i < tourIds.length; i++) {
      let newObj = {
        id: "none",
        krTitle: "none",
        totalReview: 0,
      };
      const result = await reviewModel.findReviewData({
        tourId: tourIds[i].id,
      });

      newObj.id = tourIds[i].id;
      newObj.krTitle = tourIds[i].krTitle;
      newObj.image = tourIds[i].image;
      newObj.totalReview = result.totalReview;

      newArray.push(newObj);
    }

    newArray.sort((a, b) => {
      return b.totalReview - a.totalReview;
    });

    return newArray;
  },

  sortByRating: async ({}) => {
    const tourIds = await Tour.find(
      {},
      { _id: 0, id: 1, krTitle: 1, image: 1 },
    );
    let newArray = [];

    for (let i = 0; i < tourIds.length; i++) {
      let newObj = {
        id: "none",
        krTitle: "none",
        avgRating: 0,
      };
      const result = await reviewModel.findReviewData({
        tourId: tourIds[i].id,
      });

      newObj.id = tourIds[i].id;
      newObj.krTitle = tourIds[i].krTitle;
      newObj.image = tourIds[i].image;
      newObj.avgRating = Number(result.avgRating);

      newArray.push(newObj);
    }

    newArray.sort((a, b) => {
      return b.avgRating - a.avgRating;
    });

    return newArray;
  },
};
