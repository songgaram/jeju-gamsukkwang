import { useQuery } from "react-query";

import http from "libs/apiController";

export const useGetPostList = (isSelected) => {
  return useQuery([useGetPostList], async () => {
    const res = await http.get(`/community?page=1&limit=10${isSelected}`);
    const data = res.data;
    return data;
  });
};

export const useGetPost = (postId) => {
  return useQuery([useGetPost], async () => {
    const res = await http.get(`/community/${postId}`);
    const data = res.data;
    return data;
  });
};
