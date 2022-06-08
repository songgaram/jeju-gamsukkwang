import styled from "styled-components";
import { CardTitle, CardSubtitle } from "./intro";
import { StyledButton } from "components/Button";

function Descrption({ title, subtitle }) {
  return (
    <DescrptionCard>
      <CardTitle>{title}</CardTitle>
      <CardSubtitle>{subtitle}</CardSubtitle>
      <div>
        <StyledButton>자세히 보기</StyledButton>
      </div>
    </DescrptionCard>
  );
}

const DescrptionCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 5% 5%;
  width: 50%;
  background-color: ${({ theme }) => theme.colors.gray01};
`;

export default Descrption;
