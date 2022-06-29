import { useMutation, useQuery, useQueryClient } from "react-query";
import { get, post, put } from "utils/api";

//유저 정보 가져오기
export function useGetUserInfo() {
  return useQuery(
    "userState",
    async () => {
      const res = await get("user");
      return { userState: res.data };
    },
    {
      staleTime: Infinity,
      onError: (err) => console.log(err),
    },
  );
}

//유저 이름 수정
export const useChangeNickname = () => {
  const queryClient = useQueryClient();

  return useMutation(async (nickname) => await put("user", nickname), {
    onSuccess: () => {
      queryClient.invalidateQueries("userState");
    },
    onError: (err) => console.log(err),
  });
};

//경험치 증가
export const useIncreaseExp = () => {
  const queryClient = useQueryClient();

  return useMutation(async (point) => await post("user/exp", point), {
    onSuccess: () => {
      queryClient.invalidateQueries("userState");
    },
    onError: (err) => console.log(err),
  });
};

export const useAddStamp = () => {
  const queryClient = useQueryClient();

  return useMutation(async (tourId) => await post("user/stamp", tourId), {
    onSuccess: () => {
      queryClient.invalidateQueries("userState");
    },
    onError: (err) => console.log(err),
  });
};
