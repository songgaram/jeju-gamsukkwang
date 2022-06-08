import styled from "styled-components";

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 1rem;
  padding: 5% 3%;
  margin: 2%;
  width: 22%;
  max-height: 70%;
  background-color: ${({ theme }) => theme.colors.skyblue};
  transition: background-color 0.3s;
  &:hover {
    background-color: rgba(227, 241, 251, 0.5);
  }
`;

const CardTitle = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.xxxl};
  font-weight: bold;
  margin-bottom: 10%;
`;

const CardSubtitle = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: 300;
  margin-bottom: 5%;
`;

export { CardWrapper, CardTitle, CardSubtitle };
