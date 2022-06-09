import styled from "styled-components";
import Descrption from "./Description";

const content = [
  {
    title: "랜드마크 촬영과 인증",
    subtitle:
      "내가 현재 위치한 랜드마크를 찍고 사진을 올리면 랜드마크를 자동으로 인증해주고 스탬프를 적립해드려요!",
  },

  {
    title: "검증된 후기",
    subtitle:
      "실제 랜드마크를 다녀온 관광객의 후기만을 보여드려요. 더이상 어렵고 귀찮게 여행계획 짜지마세요!",
  },

  {
    title: "다양한 정보",
    subtitle:
      "제주 여행과 관련된 정보를 자유롭게 묻고, 여행 메이트도 구할 수 있어요.",
  },
];

function DescSection() {
  return (
    <>
      <CardSectionContainer flex="flex-end">
        <Descrption
          title={content[0].title}
          subtitle={content[0].subtitle}
          number={0}
          flex="flex-start"
        />
      </CardSectionContainer>
      <CardSectionContainer flex="flex-start">
        <Descrption
          title={content[1].title}
          subtitle={content[1].subtitle}
          number={1}
          flex="flex-end"
        />
      </CardSectionContainer>
      <CardSectionContainer flex="flex-end">
        <Descrption
          title={content[2].title}
          subtitle={content[2].subtitle}
          number={2}
          flex="flex-start"
        />
      </CardSectionContainer>
    </>
  );
}

const CardSectionContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: ${(props) => props.flex};
`;

export default DescSection;
