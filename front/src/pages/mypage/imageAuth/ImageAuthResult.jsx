import styled from "styled-components";
import { ModalButton, Span, Button } from "./imageAuth.style";
import { useAddStamp, useIncreaseExp } from "queries/userQuery";
import { NoResultIcon } from "assets/svgs";
import { useState } from "react";

const ImageAuth = ({ data, setIsOpenModal }) => {
  const [authFail, setAuthFail] = useState(false);
  const addStamp = useAddStamp();
  const increaseExp = useIncreaseExp();

  const handleFailAuth = () => {
    setAuthFail(true);
  };

  const handleSuccessAuth = () => {
    const tourId = {
      tourId: data.id,
    };
    addStamp.mutate(tourId);
    increaseExp.mutate(1);
    setIsOpenModal(false);
  };

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {authFail ? (
        <>
          <NoResultIcon width={80} />
          <span>사진을 다시 업로드 해주세요! :(</span>
          <Button onClick={() => setIsOpenModal(false)}>확인</Button>
        </>
      ) : (
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
            <ModalButton onClick={handleFailAuth}>아니예요</ModalButton>
            <ModalButton onClick={handleSuccessAuth}>맞아요!</ModalButton>
          </BtnContainer>
        </>
      )}
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
