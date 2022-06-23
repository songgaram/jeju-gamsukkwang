import { useState, useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { searchKeyword, filteredSearchList } from "./state";

const useDebounce = (value, delay) => {
  const [debounceValue] = useState(value);
  const setSearch = useSetRecoilState(searchKeyword);
  const setFilterList = useSetRecoilState(filteredSearchList);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(value.trim());
      setFilterList(setSearch);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay, setSearch]);

  return debounceValue;
};

export default useDebounce;
