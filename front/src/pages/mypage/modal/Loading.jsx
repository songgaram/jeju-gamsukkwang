import { LogoIcon } from "assets/svgs";
import styled, { keyframes } from "styled-components";

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

const Span = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.small};
  color: ${({ theme }) => theme.colors.gray03};
`;
