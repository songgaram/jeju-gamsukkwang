import { atom } from "recoil";

export const levelState = atom({
  key: "#levelState",
  default: 0,
});

export const stampListState = atom({
  key: "#stampListState",
  default: [],
});
