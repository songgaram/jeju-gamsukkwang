import styled from "styled-components";
import IntroTitle from "../../assets/images/IntroTitle.png";
import BrowserImage from "../../assets/images/BrowserImage.png";
import BackgroundImage from "../../assets/images/BackgroundImage.png";

function Intro() {
  return (
    <IntroContainer>
      <Header />
      <MainContainer>
        <Title src={IntroTitle} alt="인트로 타이틀" />
        <Subtitle>
          <span style={{ color: "#F4AA19" }}>제주감수꽝</span>은 제주를 소개하고
          다녀온 랜드마크를 <br />
          인증할 수 있는 <span style={{ color: "#F4AA19" }}>공유 서비스</span>
          입니다.
        </Subtitle>

        <Browser src={BrowserImage} alt="브라우저" />
      </MainContainer>
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
  margin-top: 3%;
`;

const Subtitle = styled.div`
  margin-top: 2%;
  font-size: 2rem;
  text-align: center;
  font-weight: 500;
`;

const Browser = styled.img`
  width: 50%;
  margin-top: 5%;
`;

export default Intro;
