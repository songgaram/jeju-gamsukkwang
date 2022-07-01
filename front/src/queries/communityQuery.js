import { useQuery, useMutation } from "react-query";

import http from "libs/apiController";

export const useGetPostList = (queryData) => {
  return useQuery(["useGetPostList", queryData], async () => {
    const res = await http.get(
      `/community?page=${queryData.page}&limit=10${queryData.headSelected}`,
    );
    const data = res.data;
    return data;
  });
};

export const useGetPost = (postId) => {
  return useQuery(["useGetPost", postId], async () => {
    const res = await http.get(`/community/${postId}`);
    const data = res.data;
    return data;
  });
};

export const useDeletePost = () => {
  return useMutation((postId) => http.delete(`/community/${postId}`));
};
