import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";

import { filteredSearchList, searchKeyword } from "../textSearch/state";

import { TextSearchResultBox } from "./textSearchResult.style";

const TextSearchResult = () => {
  const navigate = useNavigate();
  const filteredList = useRecoilValue(filteredSearchList);
  const keywordState = useRecoilValue(searchKeyword);

  const handleItemClick = (tourId) => {
    navigate(`/landmark/detail/${tourId}`);
  };

  if (!keywordState) return null;
  if (filteredList.length === 0)
    return (
      <TextSearchResultBox>
        <span>검색 결과가 없습니다</span>
      </TextSearchResultBox>
    );

  return (
    <TextSearchResultBox>
      <span>추천 검색어</span>
      <ul>
        {filteredList.map((data) => {
          return (
            <li key={data.id} onClick={() => handleItemClick(data.id)}>
              {data.krTitle}
            </li>
          );
        })}
      </ul>
    </TextSearchResultBox>
  );
};

export default TextSearchResult;
