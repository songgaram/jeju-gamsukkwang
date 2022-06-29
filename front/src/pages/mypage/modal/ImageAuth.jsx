import styled from "styled-components";

const ImageAuth = ({ data }) => {
  return (
    <Card>
      <ImgBox>
        <Img src={data.image} alt="랜드마크 이미지" />
      </ImgBox>
      <TextBox>
        <p>{data.krTitle}</p>
      </TextBox>
    </Card>
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
