import styled from "styled-components";
// import { CardTitle, CardSubtitle } from "./intro";
import Button from "components/Button";
import { useScrollFadeIn } from "hooks/useScrollFadeIn";
import DescImage1 from "assets/images/DescImage1.png";
import DescImage2 from "assets/images/DescImage2.png";
import DescImage3 from "assets/images/DescImage3.png";

const image = {
  0: DescImage1,
  1: DescImage2,
  2: DescImage3,
};

const Descrption = ({ title, subtitle, number, flex }) => {
  const animatedItem = {
    0: useScrollFadeIn("left", 0.9, 0.1),
    1: useScrollFadeIn("right", 0.9, 0.3),
    2: useScrollFadeIn("left", 0.9, 0.5),
  };

  return (
    <DescContainer number={number}>
      <ImgContainer>
        <img src={image[number]} alt="기능 이미지" style={{ width: "70%" }} />
      </ImgContainer>
      <DescrptionCard>
        <ContentContainer {...animatedItem[number]} flex={flex}>
          <CardTitle>{title}</CardTitle>
          <CardSubtitle>{subtitle}</CardSubtitle>
          <div>
            <Button color="gray03">자세히 보기</Button>
          </div>
        </ContentContainer>
      </DescrptionCard>
    </DescContainer>
  );
};

const DescContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: ${(props) => (props.number === 1 ? "row-reverse" : "row")};
`;

const ImgContainer = styled.div`
  width: 50%;
  padding-top: 3%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const DescrptionCard = styled.div`
  width: 50%;
  min-height: 380px;
  background-color: ${({ theme }) => theme.colors.gray01};
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 5%;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: ${(props) => props.flex};
`;

const CardTitle = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.xxxl};
  font-weight: bold;
  margin-bottom: 3%;
`;

const CardSubtitle = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: 300;
  margin-bottom: 1%;
`;

export default Descrption;
