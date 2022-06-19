import styled from "styled-components";
import { BsStarFill } from "react-icons/bs";
import theme from "styles/Theme";

export const StarRating = ({ number, color }) => {
  const Stars = new Array(number).fill(undefined);

  return (
    <StarContainer>
      {Stars.map((e, idx) => (
        <BsStarFill key={idx} color={color} />
      ))}
    </StarContainer>
  );
};

export const StarRatingWithEmpty = ({ number }) => {
  const FiveStar = [1, 2, 3, 4, 5];

  return (
    <StarContainer>
      {FiveStar.map((el, idx) => (
        <BsStarFill
          key={idx}
          color={number >= el ? theme.colors.secondary : theme.colors.gray02}
          number={number}
        />
      ))}
    </StarContainer>
  );
};

const StarContainer = styled.div`
  width: auto;
  height: auto;
`;
