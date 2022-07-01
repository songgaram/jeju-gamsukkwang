import { useMutation, useQuery, useQueryClient } from "react-query";
import http from "libs/apiController";

//유저 정보 가져오기
export function useGetUserInfo() {
  return useQuery(
    "userState",
    async () => {
      const res = await http.get("user");
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

  return useMutation(async (nickname) => await http.put("user", nickname), {
    onSuccess: () => {
      queryClient.invalidateQueries("userState");
    },
    onError: (err) => console.log(err),
  });
};

//경험치 증가
export const useIncreaseExp = () => {
  const queryClient = useQueryClient();

  return useMutation(async (point) => await http.post("user/exp", point), {
    onSuccess: () => {
      queryClient.invalidateQueries("userState");
    },
    onError: (err) => console.log(err),
  });
};

//스탬프 추가
export const useAddStamp = () => {
  const queryClient = useQueryClient();

  return useMutation(async (tourId) => await http.post("user/stamp", tourId), {
    onSuccess: () => {
      queryClient.invalidateQueries("userState");
    },
    onError: (err) => console.log(err),
  });
};
