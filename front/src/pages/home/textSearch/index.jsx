import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";

import Input from "components/Input";
import useDebounce from "./useDebounce";
import { useGetTourList } from "queries/searchQuery";
import { tourList } from "./state";

import { InputBox } from "./textSearch.style";

const TextSearch = () => {
  const TOUR_DATA = useGetTourList().data;
  const [searchWord, setSearchWord] = useState("");
  const [, setTourList] = useRecoilState(tourList);

  useEffect(() => {
    setTourList(TOUR_DATA);
  }, [TOUR_DATA, setTourList]);

  const onChangeHandle = (e) => {
    const item = e.target.value;
    setSearchWord(item);
  };

  useDebounce(searchWord, 500);

  return (
    <InputBox>
      <Input
        type="text"
        name="search"
        placeholder="검색어를 입력해주세요."
        value={searchWord}
        onChange={onChangeHandle}
        autoComplete="off"
      />
      <span type="submit">🔍</span>
    </InputBox>
  );
};

export default TextSearch;
