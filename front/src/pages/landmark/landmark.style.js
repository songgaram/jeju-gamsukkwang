import styled from "styled-components";

const InputForm = styled.textarea`
  width: 100%;
  height: 300px;
  margin: 1% 0;
  resize: none;
`;

const Footer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  height: 50px;
`;

export { InputForm, Footer };
