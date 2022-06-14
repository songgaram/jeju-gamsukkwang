import { useState } from "react";
import styled from "styled-components";
import { BsStarFill } from "react-icons/bs";
import theme from "styles/Theme";

const ReviewForm = () => {
  const [hovered, setHovered] = useState(null);
  const [clicked, setClicked] = useState(null);

  return (
    <>
      <HeaderContainer align="center" justify="center">
        <Title>랜드마크를 평가해주세요!</Title>
        <Required>필수</Required>
      </HeaderContainer>

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

      <HeaderContainer align="center">
        <Title>다른 여행객을 위한 후기와 팁</Title>
        <Required>필수</Required>
      </HeaderContainer>
    </>
  );
};

const StarContainer = styled.div`
  text-align: center;
  border: none;
  padding: 3% 1%;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: ${(props) => props.justify};
  align-items: ${(props) => props.align};
  margin-top: 5%;
`;

const Title = styled.div`
  font-size: ${theme.fontSizes.xxxl};
  font-weight: bold;
  margin-right: 0.5%;
`;

const Required = styled.p`
  font-size: ${theme.fontSizes.base};
  color: ${theme.colors.secondary};
  font-weight: bold;
`;

export default ReviewForm;
