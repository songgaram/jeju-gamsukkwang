import styled from "styled-components";
import Button from "components/Button";
import ReviewSection from "./ReviewSection";
import { useGetLandmark } from "queries/landmarkQuery";

const Landmark = () => {
  const id = "1d4ec9e9-fef7-4204-8527-10fa21e9e851";
  const { krTitle } = useGetLandmark(id);

  console.log(krTitle);
  return (
    <>
      <LandmarkContainer>
        <ImgContainer>이미지</ImgContainer>
        <DetailContainer>
          <DetailTitle>우도</DetailTitle>
          <DetailContent>
            <DetailTabRow>
              <DetailTabCell>
                <DetailHighlight>주소</DetailHighlight>
              </DetailTabCell>
              <DetailTabCell>
                <p>제주도 제주시</p>
              </DetailTabCell>
            </DetailTabRow>
            <DetailTabRow>
              <DetailTabCell>
                <DetailHighlight>소개</DetailHighlight>
              </DetailTabCell>
              <DetailTabCell>
                <p>소가 누워있는 형상을 하고 있는 제주의 가장 큰 부속섬</p>
              </DetailTabCell>
            </DetailTabRow>
            <DetailTabRow>
              <DetailTabCell>
                <DetailHighlight>연락처</DetailHighlight>
              </DetailTabCell>
              <DetailTabCell>
                <p>(+82) 064-728-1527</p>
              </DetailTabCell>
            </DetailTabRow>
          </DetailContent>
          <BtnPosition>
            <Button color="gray03">길찾기</Button>
          </BtnPosition>
        </DetailContainer>
      </LandmarkContainer>
      <ReviewSection />
    </>
  );
};

const LandmarkContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  margin-bottom: 10%;
`;

const ImgContainer = styled.div`
  width: 50%;
  height: 400px;
  background-color: gray;
`;

const DetailContainer = styled.div`
  width: 50%;
  padding: 8% 0 0 5%;
`;

const DetailTitle = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.xxxl};
  font-weight: bold;
  margin-bottom: 5%;
  width: 100%;
`;

const DetailHighlight = styled.p`
  font-weight: bold;
`;

const DetailContent = styled.div`
  display: table;
  width: 100%;
`;

const DetailTabRow = styled.div`
  display: table-row;
  height: 30px;
`;

const DetailTabCell = styled.div`
  display: table-cell;
`;

const BtnPosition = styled.div`
  width: 100%;
  margin-top: 3%;
  padding-left: 75%;
`;

export default Landmark;
