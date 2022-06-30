<<<<<<< HEAD:front/src/pages/home/loading/index.jsx
import ModalPortal from "components/modal/modalPortal";
import { LogoIcon } from "assets/svgs";

import styled, { keyframes } from "styled-components";

const Loading = () => {
  return (
    <ModalPortal>
      <ModalBackground>
        <ModalBox>
          <LogoBox>
            <LogoIcon width={100} />
          </LogoBox>
          <span>감귤이가 장소를 찾고 있어요</span>
        </ModalBox>
      </ModalBackground>
    </ModalPortal>
  );
};

export default Loading;

=======
import styled, { keyframes } from "styled-components";

>>>>>>> e7da8d0d7176fcca6c0e9febb3eb95217e282d40:front/src/pages/home/modal/loading/loading.style.js
const fadeIn = keyframes`
 from {
    background: rgba(0, 0, 0, 0%);
  }

  to {
    background: rgba(0, 0, 0, 30%);
    backdrop-filter: blur(5px);
  }
`;

const ModalBackground = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  animation: ${fadeIn} 0.4s cubic-bezier(0.5, 0, 0, 0.8) forwards;

  * {
    font-weight: 600;
    color: ${({ theme }) => theme.colors.black};
  }
`;

const slideUp = keyframes`
  from {
    opacity: 0;
    transform: scale(0.8) translateY(100%);
  }

  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
`;

const ModalBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 400px;
  height: 300px;
  padding: 50px;
  background: ${({ theme }) => theme.colors.white};
  border-radius: 10px;
  animation: ${slideUp} 0.4s cubic-bezier(0.5, 0, 0, 0.8) forwards;
`;

const rotateImage = keyframes`
  100% {
        transform: rotate(360deg);
    }
`;

const LogoBox = styled.div`
  animation: ${rotateImage} 2.5s linear infinite;
  transform-origin: 50% 50%;
`;

export { ModalBackground, ModalBox, LogoBox };
