import { useQuery } from "react-query";
import http from "libs/apiController";

export const useGetLandmark = (id) => {
  return useQuery(["landmark", id], async () => {
    const res = await http.get(`tour/${id}`);
    return res.data;
  });
};
