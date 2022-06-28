import { atom, selector } from "recoil";
import jwtDecode from "jwt-decode";

export const loginState = atom({
  key: "#loginState",
  default: false,
});

export const userState = selector({
  key: "#userState",
  get: ({ get }) => {
    const isLogin = get(loginState);
    const userToken = localStorage.getItem("accessToken");
    const jwtDecoded = jwtDecode(userToken);
    const userId = jwtDecoded.userId;

    if (!isLogin || !userToken) return null;

    return userId;
  },
});
