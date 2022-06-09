import styled from "styled-components";
import { CardTitle, CardSubtitle } from "./intro";
import Button from "components/Button";
import { useScrollFadeIn } from "assets/hook/useScrollFadeIn";

function Descrption({ title, subtitle, number, flex }) {
  const animatedItem = {
    0: useScrollFadeIn("left", 0.9, 0.1),
    1: useScrollFadeIn("right", 0.9, 0.3),
    2: useScrollFadeIn("left", 0.9, 0.5),
  };

  return (
    <DescrptionCard>
      <ContentContainer {...animatedItem[number]} flex={flex}>
        <CardTitle>{title}</CardTitle>
        <CardSubtitle>{subtitle}</CardSubtitle>
        <div>
          <Button color="gray03">자세히 보기</Button>
        </div>
      </ContentContainer>
    </DescrptionCard>
  );
}

const DescrptionCard = styled.div`
  width: 50%;
  background-color: ${({ theme }) => theme.colors.gray01};
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: ${(props) => props.flex};
  padding: 5% 5%;
`;

export default Descrption;
