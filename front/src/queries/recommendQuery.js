import { useQuery } from "react-query";
import http from "libs/apiController";

export const useGetRecommendLikes = () => {
  return useQuery(["likes"], async () => {
    const res = await http.get("/recommend/likes");
    const data = res.data;
    return data;
  });
};
