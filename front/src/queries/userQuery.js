import { useQuery } from "react-query";
import http from "libs/apiController";

export const useGetUserState = (userId) => {
  return useQuery(["user", userId], async () => {
    const res = await http.get(`account/${userId}`);
    return { userState: res.data };
  });
};
