import styled from "styled-components";

function CardSection() {
  return (
    <CardSectionContainer>
      <Title>
        “내가 간 제주를 <Highlighted>저장</Highlighted>하고{" "}
        <Highlighted>공유</Highlighted>하는 방법은 없을까?”
      </Title>
      <SubTitle>제주감수꽝은 두가지 니즈에서 출발하였습니다.</SubTitle>
    </CardSectionContainer>
  );
}

export default CardSection;

const CardSectionContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
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
  margin-bottom: 1.5%;
  font-size: ${({ theme }) => theme.fontSizes.xxxl};
  color: ${({ theme }) => theme.colors.gray03};
  text-align: center;
`;
