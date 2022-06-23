import { useState } from "react";
import RecommendCard from "./card";
import Dropdown from "./dropdown";

import {
  TourPage,
  ContentBox,
  CardsContainer,
  DropdownBox,
} from "./recommend.style";

const Tour = () => {
  const [isSelected, setInSelected] = useState("likes");

  const dropDownFunction = (itemValue) => {
    setInSelected(itemValue);
  };

  return (
    <TourPage>
      <ContentBox>
        <h1>감귤이가 추천하는 제주도 랜드마크</h1>
        <p>랜드마크를 클릭하면 상세 정보와 후기를 볼 수 있어요 :)</p>
      </ContentBox>
      <DropdownBox>
        <Dropdown dropDownFunction={dropDownFunction} />
      </DropdownBox>
      <CardsContainer>
        <RecommendCard isSelected={isSelected} />
      </CardsContainer>
    </TourPage>
  );
};

export default Tour;
