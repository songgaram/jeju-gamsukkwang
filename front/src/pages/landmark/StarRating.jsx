import styled from "styled-components";
import { BsStarFill } from "react-icons/bs";

const StarRating = ({ number, color }) => {
  const Stars = new Array(number).fill(undefined);

  return (
    <StarContainer>
      {Stars.map((e, idx) => (
        <BsStarFill key={idx} color={color} />
      ))}
    </StarContainer>
  );
};

const StarContainer = styled.div`
  width: auto;
  height: auto;
`;

export default StarRating;
