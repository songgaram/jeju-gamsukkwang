import { atom, selector } from "recoil";

export const tourList = atom({
  key: "#tourList",
  default: [],
});

export const searchKeyword = atom({
  key: "#searchKeyword",
  default: "",
});

export const filteredSearchList = selector({
  key: "#filteredSearchList",
  get: ({ get }) => {
    const list = get(tourList);
    const keyword = get(searchKeyword);

    let filteredResult = list.filter((item) => item.krTitle.includes(keyword));

    if (filteredResult.length === list.length || filteredResult.length === 0) {
      filteredResult = null;
      console.log(filteredResult);
      return filteredResult;
    }

    console.log(filteredResult);

    return filteredResult;
  },
});
