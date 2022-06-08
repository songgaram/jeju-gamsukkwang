import styled from "styled-components";
import IntroTitle from "assets/images/IntroTitle.png";
import BrowserImage from "assets/images/BrowserImage.png";
import BackgroundImage from "assets/images/BackgroundImage.png";
import { StyledButton } from "components/Button";
import CardSection from "./CardSection";

function Intro() {
  return (
    <IntroContainer>
      <Header />
      <MainContainer>
        <Title src={IntroTitle} alt="인트로 타이틀" />
        <Subtitle>
          <Highlighted>제주감수꽝</Highlighted>은 제주를 소개하고 다녀온
          랜드마크를 <br />
          인증할 수 있는 <Highlighted>공유 서비스</Highlighted>
          입니다.
        </Subtitle>
        <StyledButton>로그인하고 시작하기</StyledButton>
        <Browser src={BrowserImage} alt="브라우저" />
      </MainContainer>
      <CardSection />
    </IntroContainer>
  );
}

const IntroContainer = styled.div`
  width: 100%;
  height: auto;
`;

const Header = styled.div`
  height: 80px;
  background-color: white;
`;

const MainContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: url(${BackgroundImage});
  background-size: cover;
  background-position: 50% 50%;
`;

const Title = styled.img`
  width: 40%;
  margin: 3% 0 2% 0;
`;

const Subtitle = styled.div`
  margin-bottom: 1.5%;
  font-size: ${({ theme }) => theme.fontSizes.xxxl};
  text-align: center;
  font-weight: 500;
`;

const Highlighted = styled.span`
  color: ${({ theme }) => theme.colors.orange};
`;

const Browser = styled.img`
  width: 50%;
  margin-top: 5%;
  margin-bottom: 3%;
`;

export default Intro;
