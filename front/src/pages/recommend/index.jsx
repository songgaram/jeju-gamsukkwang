import RecommendCard from "./card";

import { TourPage, ContentBox, CardsContainer } from "./recommend.style";

const Tour = () => {
  return (
    <TourPage>
      <ContentBox>
        <h1>감귤이가 추천하는 제주도 랜드마크</h1>
        <p>랜드마크를 클릭하면 상세 정보와 후기를 볼 수 있어요 :)</p>
      </ContentBox>
      <CardsContainer>
        <RecommendCard />
      </CardsContainer>
    </TourPage>
  );
};

export default Tour;
