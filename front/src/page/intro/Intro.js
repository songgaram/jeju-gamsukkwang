import styled from "styled-components";

function Intro() {
  return (
    <IntroContainer>
      <Header />
    </IntroContainer>
  );
}

const IntroContainer = styled.div`
  width: 100vw;
  height: auto;
  background-color: ivory;
`;

const Header = styled.div`
  height: 80px;
`;
// const BackgroundImage = styled.div`
//   background: url("/assets/images/IntroBackground.png");
// `;

export default Intro;
