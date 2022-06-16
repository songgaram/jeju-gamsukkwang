import { useQuery } from "react-query";
import http from "libs/apiController";

export const useGetRatingList = (id) => {
  return useQuery(["rating", id], async () => {
    const res = await http.get(`review/${id}/list`);
    const { totalReview, avgRating, starRating } = res.data;
    return totalReview, avgRating, starRating;
  });
};
