import styled from "styled-components";

export const StyledButton = styled.button`
  display: inline-flex;
  align-items: center;
  outline: none;
  border-radius: 0.5rem;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  padding-left: 1rem;
  padding-right: 1rem;

  /*크기*/
  height: 2.25rem;
  font-size: ${({ theme }) => theme.fontSizes.small};

  /*색상 */
  background: none;
  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.white};
  }
  &:active {
    background: #e87c1c;
  }
`;
