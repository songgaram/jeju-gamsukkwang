import { atom, selector } from "recoil";

import { useGetTourList } from "queries/searchQuery";

const TOUR_DATA = useGetTourList();

export const tourList = atom({
  key: "#tourList",
  default: TOUR_DATA.data,
});

export const searchKeyword = atom({
  key: "#searchKeyword",
  default: "",
});
