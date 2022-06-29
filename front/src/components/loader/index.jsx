import { LogoIcon } from "assets/svgs";
import LogoImg from "assets/images/LogoIcon.png";

import styled, { keyframes } from "styled-components";

const Loader = () => {
  return (
    <Background>
      <LogoBox>
        <img src={LogoImg} />
      </LogoBox>
      <TextBox>
        <span>L</span>
        <span>O</span>
        <span>A</span>
        <span>D</span>
        <span>I</span>
        <span>N</span>
        <span>G</span>
        <span>.</span>
        <span>.</span>
        <span>.</span>
      </TextBox>
    </Background>
  );
};

export default Loader;

const Background = styled.div`
  z-index: 20;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
`;

const rotateImage = keyframes`
  100% {
    transform: rotate(360deg);
  }
`;

const LogoBox = styled.div`
  z-index: 21;
  animation: ${rotateImage} 1.8s linear infinite;
  transform-origin: 50% 50%;
  margin-bottom: 20px;

  img {
    width: 80px;
    height: auto;
  }
`;

const waveText = keyframes`
  0% {
    transform: translateY(0rem);
  }
    
  20% {
    transform: translateY(0.5rem);
  }
    
  40%,100% {
    transform: translateY(0rem)
  }
    
`;

const TextBox = styled.div`
  span {
    display: inline-block;
    font-size: 20px;
    font-weight: 600;
    animation: ${waveText} 1s ease-in-out infinite;
  }

  span:nth-of-type(1) {
    animation-delay: 0s;
  }
  span:nth-of-type(2) {
    animation-delay: 0.1s;
  }
  span:nth-of-type(3) {
    animation-delay: 0.2s;
  }
  span:nth-of-type(4) {
    animation-delay: 0.3s;
  }
  span:nth-of-type(5) {
    animation-delay: 0.4s;
  }
  span:nth-of-type(6) {
    animation-delay: 0.5s;
  }
  span:nth-of-type(7) {
    animation-delay: 0.6s;
  }
  span:nth-of-type(8) {
    animation-delay: 0.7s;
  }
  span:nth-of-type(9) {
    animation-delay: 0.8s;
  }
  span:nth-of-type(10) {
    animation-delay: 0.9s;
  }
`;
