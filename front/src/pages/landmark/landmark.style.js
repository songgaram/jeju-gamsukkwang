import styled from "styled-components";

const ReviewFormContainer = styled.form`
  width: 100%;
`;

const InputForm = styled.textarea`
  width: 100%;
  height: 300px;
  margin: 1% 0;
  resize: none;
  font-size: ${({ theme }) => theme.fontSizes.lg};
  border: 1px solid ${({ theme }) => theme.colors.gray02};
  outline-color: ${({ theme }) => theme.colors.secondary};
  &:focus {
    border: 1px solid ${({ theme }) => theme.colors.primary};
  }
`;

const Footer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  height: 50px;
`;

const StarContainer = styled.div`
  text-align: center;
  border: none;
  padding: 3% 1%;
`;

export { ReviewFormContainer, InputForm, Footer, StarContainer };
