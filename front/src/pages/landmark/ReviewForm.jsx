import { useState } from "react";
import styled from "styled-components";
import { BsStarFill } from "react-icons/bs";
import theme from "styles/Theme";

const ReviewForm = () => {
  const [hovered, setHovered] = useState(null);
  const [clicked, setClicked] = useState(null);

  return (
    <StarContainer>
      {[1, 2, 3, 4, 5].map((el) => (
        <BsStarFill
          color={
            (clicked >= el) | (hovered >= el)
              ? theme.colors.secondary
              : theme.colors.gray02
          }
          key={el}
          size={theme.fontSizes.titleSize}
          onMouseEnter={() => setHovered(el)}
          onMouseLeave={() => setHovered(null)}
          onClick={() => setClicked(el)}
        />
      ))}
    </StarContainer>
  );
};

const StarContainer = styled.div`
  text-align: center;
  border: none;
  padding: 5% 1%;
`;

export default ReviewForm;
