import styled from "styled-components";

const Landmark = () => {
  return (
    <LandmarkContainer>
      <ImgContainer>이미지</ImgContainer>

      <DetailContainer>디테일</DetailContainer>
    </LandmarkContainer>
  );
};

const LandmarkContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  background-color: gray;
`;

const ImgContainer = styled.div`
  width: 50%;
`;

const DetailContainer = styled.div`
  width: 50%;
  background-color: ivory;
`;

export default Landmark;
