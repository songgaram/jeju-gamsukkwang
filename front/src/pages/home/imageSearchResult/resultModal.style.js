import styled, { keyframes } from "styled-components";

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
    font-size: 14px;
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
  flex-direction: row;
  justify-content: center;
  align-items: center;
  animation: ${slideUp} 0.4s cubic-bezier(0.5, 0, 0, 0.8) forwards;
`;

const ContentsBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
  width: 550px;
  height: 400px;
  padding: 50px;
  background: ${({ theme }) => theme.colors.white};
  border-radius: 0 10px 10px 0;

  li {
    margin-bottom: 15px;
  }

  li:first-child {
    font-size: 22px;
    font-weight: 600;
  }
`;

const Img = styled.img`
  width: 300px;
  height: 400px;
  border-radius: 10px 0 0 10px;
`;

const RatingBox = styled.div`
  width: 440px;
  margin: 30px 0;

  dl {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;

    svg {
      margin-bottom: 15px;
    }

    dt {
      margin-bottom: 15px;
    }

    dd {
      margin-bottom: 15px;
      font-weight: 600;
    }
  }

  * {
    font-size: 16px;
    text-align: center;
  }
`;

const ButtonBox = styled.div`
  width: 440px;
  display: flex;
  justify-content: flex-end;

  button {
    padding: 10px 20px;
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.white};
    border-radius: 10px;
    border: none;
    cursor: pointer;
  }
`;

export { ModalBackground, ModalBox, Img, ContentsBox, RatingBox, ButtonBox };
