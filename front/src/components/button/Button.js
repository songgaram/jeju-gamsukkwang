import React from "react";
import styled, { css } from "styled-components";
import { darken } from "polished";

const StyledButton = styled.button`
  display: inline-flex;
  align-items: center;
  outline: none;
  border-radius: 0.5rem;
  cursor: pointer;
  padding-left: 1rem;
  padding-right: 1rem;
  transition: all 0.2s ease-in-out;

  /*크기*/
  height: 2.25rem;
  font-size: ${({ theme }) => theme.fontSizes.small};

  /*색상*/
  ${(props) => {
    const selected = props.theme.colors[props.color];
    return css`
      background: none;
      color: ${selected};
      border: 1px solid ${selected};
      &:hover {
        background: ${selected};
        color: ${props.theme.colors.white};
      }
      &:active {
        background: ${darken(0.1, selected)};
      }
    `;
  }}

  /* 기타 */
  & + & {
    margin-left: 1rem;
  }
  &:disabled {
    background: ${({ theme }) => theme.colors.gray03};
    color: ${({ theme }) => theme.colors.white};
    border: none;
  }
`;

function Button({ children, ...rest }) {
  return <StyledButton {...rest}>{children}</StyledButton>;
}

Button.defaultProps = {
  color: "primary",
};

export default Button;
