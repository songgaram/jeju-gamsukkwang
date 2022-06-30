import styled, { css } from "styled-components";
import { darken } from "polished";

const ModalButton = styled.button`
  padding: 10px 20px;
  color: ${({ theme }) => theme.colors.white};
  border-radius: 10px;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  ${(props) => {
    const selectedColor = props.theme.colors[props.color];
    const selectedMt = props.mt;
    return css`
      margin-top: ${selectedMt};
      background: ${selectedColor};
      &:hover {
        background: ${darken(0.1, selectedColor)};
      }
    `;
  }}
`;

export default ModalButton;
