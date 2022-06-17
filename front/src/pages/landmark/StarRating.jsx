import styled from "styled-components";
import { BsStarFill } from "react-icons/bs";

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

export const StarRatingWithEmpty = ({ number, color }) => {
  const FiveStar = [0, 1, 2, 3, 4, 5];

  return (
    <StarContainer>
      {FiveStar.map((star, idx) => (
        <BsStarFill key={idx} color={color} number={number} />
      ))}
    </StarContainer>
  );
};

const StarContainer = styled.div`
  width: auto;
  height: auto;
`;
