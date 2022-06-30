import { LogoIcon } from "assets/svgs";
import styled, { keyframes } from "styled-components";
import { Span } from "./imageAuth.style";

const Loading = () => {
  return (
    <>
      <LogoBox>
        <LogoIcon width={100} />
      </LogoBox>
      <Span>감귤이가 장소를 찾고 있어요 :)</Span>
    </>
  );
};

export default Loading;

const rotateImage = keyframes`
  100% {
        transform: rotate(360deg);
    }
`;

const LogoBox = styled.div`
  animation: ${rotateImage} 1.8s linear infinite;
  transform-origin: 50% 50%;
`;
