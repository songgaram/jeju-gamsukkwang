import { useQuery } from "react-query";

import http from "libs/apiController";

export const useGetPostList = (headSelected) => {
  return useQuery([useGetPostList, "headSelected"], async () => {
    const res = await http.get(`/community?page=1&limit=10${headSelected}`);
    const data = res.data;
    return data;
  });
};

export const useGetPost = (postId) => {
  return useQuery([useGetPost, "postId"], async () => {
    const res = await http.get(`/community/${postId}`);
    const data = res.data;
    return data;
  });
};
