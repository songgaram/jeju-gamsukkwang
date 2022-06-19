import RecommendCard from "./card";
import styled from "styled-components";

const Tour = () => {
  return (
    <TourPage>
      <ContentBox>
        <h1>감귤이가 추천하는 제주도 랜드마크 BEST 30</h1>
        <p>랜드마크를 클릭하면 상세 정보와 후기를 볼 수 있어요 :)</p>
      </ContentBox>
      <CardsContainer>
        <RecommendCard />
      </CardsContainer>
    </TourPage>
  );
};

export default Tour;

const TourPage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  padding: 60px 40px;
`;

const ContentBox = styled.div`
  margin-bottom: 40px;
  text-align: center;

  h1 {
    margin-bottom: 20px;
    font-size: 24px;
    font-weight: 600;
  }
`;

const CardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;
