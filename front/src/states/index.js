import { atom, selector } from "recoil";
import http from "libs/apiController";

export const loginState = atom({
  key: "#loginState",
  default: localStorage.getItem("accessToken"),
});

export const userState = selector({
  key: "#userState",
  get: async ({ get }) => {
    const isLogin = get(loginState);
    const userToken = localStorage.getItem("accessToken");
    if (!isLogin || !userToken) return null;

    try {
      const res = await http.get("user");
      return res.data;
    } catch (err) {
      console.log("🚀 ~ userState error : ", err);
    }
  },
});
