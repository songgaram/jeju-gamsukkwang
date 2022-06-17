import { useQuery } from "react-query";
import http from "libs/apiController";

export const useGetRatingInfo = (id) => {
  return useQuery(["rating", id], async () => {
    const res = await http.get(`review/${id}/info`);
    return { rating: res.data };
  });
};
