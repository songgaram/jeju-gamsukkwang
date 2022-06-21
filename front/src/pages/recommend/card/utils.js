import {
  useGetReviews,
  useGetLikes,
  useGetRating,
} from "queries/recommendQuery";

export const useGetQuery = (dataKey) => {
  const getReactQuery = {
    "리뷰 순": useGetReviews(),
    "좋아요 순": useGetLikes(),
    "리뷰 평점 순": useGetRating(),
  }[dataKey];

  return getReactQuery;
};
