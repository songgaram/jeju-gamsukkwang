import { atom } from "recoil";

export const levelState = atom({
  key: "#levelState",
  default: 0,
});

export const stampList = atom({
  key: "#stampList",
  default: [],
});
