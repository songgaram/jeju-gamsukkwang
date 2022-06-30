import { useEffect, useRef, useState } from "react";
import { useClickAway } from "react-use";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";

import { searchKeyword } from "./textSearch/state";
import TextSearch from "./textSearch";
import ImageSearch from "./imageSearch";
import TextSearchResult from "./textSearchResult";

import { HomeContainer, ContentsBox, TextButtonBox } from "./home.style";

const Home = () => {
  const navigate = useNavigate();
  const outsideRef = useRef(null);
  const [isClosed, setIsClosed] = useState(false);
  const keywordState = useRecoilValue(searchKeyword);

  useClickAway(outsideRef, () => {
    setIsClosed(true);
  });

  useEffect(() => {
    setIsClosed(false);
  }, [keywordState]);

  return (
    <HomeContainer>
      <ContentsBox>
        <h1>사진 속 그 장소가 어딘지 찾고 계신가요?</h1>
        <span>검색어를 입력하거나, 궁금한 장소의 이미지를 올려주세요.</span>
        <span>AI 서비스 감귤이가 사진 속 장소를 찾아드려요.</span>
      </ContentsBox>
      <div ref={outsideRef}>
        <TextSearch />
        {!isClosed && <TextSearchResult />}
      </div>
      <ImageSearch />
      <TextButtonBox>
        <span>제주도의 다양한 랜드마크가 궁금하다면</span>
        <span type="button" onClick={() => navigate("/recommend")}>
          추천 장소 보러가기 〉
        </span>
      </TextButtonBox>
    </HomeContainer>
  );
};

export default Home;
