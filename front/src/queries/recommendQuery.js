import { useQuery } from "react-query";
import http from "libs/apiController";

export const useGetReviews = () => {
  return useQuery(["reviews"], async () => {
    const res = await http.get("/recommend/reviews");
    const data = res.data;
    return data;
  });
};

export const useGetLikes = () => {
  return useQuery(["likes"], async () => {
    const res = await http.get("/recommend/likes");
    const data = res.data;
    return data;
  });
};

export const useGetRating = () => {
  return useQuery(["rating"], async () => {
    const res = await http.get("/recommend/rating");
    const data = res.data;
    return data;
  });
};
