import styled, { css } from "styled-components";
import { BsStarFill } from "react-icons/bs";

export const StarRating = ({ number, color }) => {
  const stars = new Array(number).fill(undefined);

  return (
    <StarContainer>
      {stars.map((e, idx) => (
        <Stars key={idx} color={color} />
      ))}
    </StarContainer>
  );
};

export const StarRatingWithEmpty = ({ number }) => {
  const FiveStar = [1, 2, 3, 4, 5];

  return (
    <StarContainer>
      {FiveStar.map((el, idx) => (
        <StarswithEmpty key={idx} number={number} el={el} />
      ))}
    </StarContainer>
  );
};

const StarContainer = styled.div`
  width: auto;
  height: auto;
`;

const Stars = styled(BsStarFill)`
  ${(props) => {
    const selected = props.theme.colors[props.color];
    return css`
      color: ${selected};
    `;
  }}
`;

const StarswithEmpty = styled(BsStarFill)`
  color: ${(props) =>
    props.number >= props.el
      ? props.theme.colors.secondary
      : props.theme.colors.gray02};
`;
