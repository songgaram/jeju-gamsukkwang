import styled from "styled-components";
import { ModalButton, Span } from "./modal.style";

const ImageAuth = ({ data }) => {
  const handleCloseButtonClick = () => {
    // setIsOpenModal(false);
  };

  return (
    <>
      <Span>
        <p>지금 계신 곳이 여긴가요!</p>
      </Span>
      <Card>
        <ImgBox>
          <Img src={data.image} alt="랜드마크 이미지" />
        </ImgBox>
        <TextBox>
          <p>{data.krTitle}</p>
        </TextBox>
      </Card>
      <BtnContainer>
        <ModalButton onClick={handleCloseButtonClick}>아니예요</ModalButton>
        <ModalButton onClick={handleCloseButtonClick}>맞아요!</ModalButton>
      </BtnContainer>
    </>
  );
};

export default ImageAuth;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  width: 250px;
  height: 230px;
  margin: 20px;
  background: ${({ theme }) => theme.colors.white};
  border-radius: 5px;
  box-shadow: 0px 3px 12px rgba(0, 0, 0, 6%);
`;

const TextBox = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 60px;
  padding: 0 20px;
`;

const ImgBox = styled.div`
  width: 250px;
  height: 170px;
  overflow: hidden;
`;

const Img = styled.img`
  width: 250px;
  height: 170px;
  border-radius: 5px 5px 0 0;
  transition: all 0.2s linear;

  &:hover {
    transform: scale(1.05);
  }
`;

const BtnContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;
