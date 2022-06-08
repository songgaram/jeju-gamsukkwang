import styled from "styled-components";

export default function Card({ title, subtitle1, subtitle2 }) {
  return (
    <CardWrapper>
      <Title>{title}</Title> <br />
      <Subtitle>{subtitle1}</Subtitle>
      <br />
      <Subtitle>{subtitle2}</Subtitle>
    </CardWrapper>
  );
}

const CardWrapper = styled.div`
  postion: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 1rem;
  padding: 5% 3%;
  margin: 2%;
  width: 22%;
  max-height: 60%;
  background-color: ${({ theme }) => theme.colors.skyblue};
  transition: background-color 0.3s;
  &:hover {
    background-color: rgba(227, 241, 251, 0.5);
  }
`;

const Title = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.xxxl};
  font-weight: bold;
  margin-bottom: 1%;
`;

const Subtitle = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.base};
  color: ${({ theme }) => theme.colors.gray03};
  font-weight: 350;
`;
