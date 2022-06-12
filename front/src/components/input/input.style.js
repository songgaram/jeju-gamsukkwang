import styled from "styled-components";

const StyledInput = styled.input`
  width: 400px;
  height: 48px;
  padding: 0 20px;
  letter-spacing: 0.5px;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.gray02};
  outline: none;
  &:focus {
    border: 1px solid ${({ theme }) => theme.colors.primary};
  }
`;

export { StyledInput };
