import { useQuery, useInfiniteQuery } from "react-query";
import http from "libs/apiController";

export const useGetRatingInfo = (postId) => {
  return useQuery(["rating", postId], async () => {
    const res = await http.get(`review/${postId}/info`);
    return { rating: res.data };
  });
};

export const useGetReviewList = (postId) => {
  const fetchReviewList = async ({ pageParam = 1 }) => {
    const res = await http.get(
      `review/${postId}/list?page=${pageParam}&limit=5`,
    );
    const { reviews, totalPage } = res.data;
    return { reviews, totalPage, pageParam, nextPage: pageParam + 1 };
  };

  return useInfiniteQuery(["reviews", postId], fetchReviewList, {
    staleTime: 50000,
    cacheTime: 120000,
    getNextPageParam: (lastPage) =>
      lastPage.totalPage === lastPage.pageParam ? lastPage.nextPage : undefined,
  });
};