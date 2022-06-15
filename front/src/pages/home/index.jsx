import { useNavigate } from "react-router-dom";

import Input from "components/input";
import {
  HomeContainer,
  ContentsBox,
  InputBox,
  Button,
  TextButtonBox,
} from "./home.style";

const Home = () => {
  const navigate = useNavigate();

  return (
    <HomeContainer>
      <ContentsBox>
        <h1>사진 속 그 장소가 어딘지 찾고 계신가요?</h1>
        <span>검색어를 입력하거나, 궁금한 장소의 이미지를 올려주세요.</span>
        <span>AI 서비스 감귤이가 사진 속 장소를 찾아드려요.</span>
      </ContentsBox>
      <InputBox>
        <Input type="text" name="search" placeholder="검색어를 입력해주세요." />
        <span type="button">🔍</span>
      </InputBox>
      <Button>📷 이미지로 검색하기</Button>
      <TextButtonBox>
        <span>제주도의 다양한 랜드마크가 궁금하다면</span>
        <span type="button" onClick={() => navigate("/landmark")}>
          추천 장소 보러가기 〉
        </span>
      </TextButtonBox>
    </HomeContainer>
  );
};

export default Home;
