import styled from "styled-components";
import Card from "./Card";
import { useScrollFadeIn } from "hooks/useScrollFadeIn";

const content = [
  {
    title: "기록하고 싶은 장소",
    subtitle1:
      "실제로 제주를 관광할 때, 추억에 남는 랜드마크를 기억하고 싶은 사용자들을 위해서 기획하였습니다.",
    subtitle2:
      "해당 관광 랜드마크 사진을 촬영하고 업로드 시, 서비스에 탑재한 인공지능이 이미지를 분석하여 관광 랜드마크를 파악하여 사용자에게 알려줍니다.",
  },
  {
    title: "간단한 여행 계획",
    subtitle1:
      "맛집 대비 랜드마크는 리뷰 수가 적어 관광객으로 하여금 불편함을 초래합니다. 따라서 관광지 리뷰를 통해 간단한 관광 계획 설계를 돕고자 하였습니다.",
    subtitle2:
      "실제로 다녀간 관광객의 리뷰만을 엄선하여 정확하고 신뢰성있는 정보를 제공합니다.",
  },
];

const CardSection = () => {
  const animatedItem = {
    0: useScrollFadeIn("up", 0.9, 0),
    1: useScrollFadeIn("up", 0.9, 0.3),
    2: useScrollFadeIn("up", 0.9, 0.4),
  };

  return (
    <CardSectionContainer>
      <ContentContainer {...animatedItem[0]}>
        <Title>
          “내가 간 제주를 <Highlighted>저장</Highlighted>하고{" "}
          <Highlighted>공유</Highlighted>하는 방법은 없을까?”
        </Title>
        <SubTitle>제주감수꽝은 두가지 니즈에서 출발하였습니다.</SubTitle>
      </ContentContainer>

      <CardContainer>
        <InnerCardContainer {...animatedItem[1]}>
          <Card
            {...animatedItem[1]}
            title={content[0].title}
            subtitle1={content[0].subtitle1}
            subtitle2={content[0].subtitle2}
          />
        </InnerCardContainer>
        <InnerCardContainer {...animatedItem[2]}>
          <Card
            {...animatedItem[1]}
            title={content[1].title}
            subtitle1={content[1].subtitle1}
            subtitle2={content[1].subtitle2}
          />
        </InnerCardContainer>
      </CardContainer>
    </CardSectionContainer>
  );
};

export default CardSection;

const CardSectionContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ContentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 3%;
`;

const CardContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: 12%;
`;

const InnerCardContainer = styled.div`
  width: 25%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.div`
  margin: 13% 0 1.5% 0;
  font-size: ${({ theme }) => theme.fontSizes.subtitleSize};
  text-align: center;
  font-weight: bold;
`;

const Highlighted = styled.span`
  color: ${({ theme }) => theme.colors.orange};
`;

const SubTitle = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.xxxl};
  color: ${({ theme }) => theme.colors.gray03};
  text-align: center;
`;
