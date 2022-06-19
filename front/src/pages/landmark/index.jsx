import { useParams } from "react-router-dom";
import styled from "styled-components";
import Button from "components/Button";
import ReviewSection from "./ReviewSection";
import { useGetLandmark } from "queries/landmarkQuery";

const Landmark = () => {
  const params = useParams();
  const id = params.id;
  const { data } = useGetLandmark(id);

  return (
    <>
      <LandmarkContainer>
        <ImgContainer img={data?.landmark?.image} />
        <DetailContainer>
          <Header>
            <DetailTitle>{data?.landmark?.krTitle}</DetailTitle>
            <Button color="gray03">길찾기</Button>
          </Header>

          <DetailContent>
            <DetailTabRow>
              <DetailTabCell>
                <DetailHighlight>주소</DetailHighlight>
              </DetailTabCell>
              <DetailTabCell>
                <p>{data?.landmark?.address}</p>
              </DetailTabCell>
            </DetailTabRow>
            <DetailTabRow>
              <DetailTabCell>
                <DetailHighlight>소개</DetailHighlight>
              </DetailTabCell>
              <DetailTabCell>
                <p>{data?.landmark?.description}</p>
              </DetailTabCell>
            </DetailTabRow>
            <DetailTabRow>
              <DetailTabCell>
                <DetailHighlight>연락처</DetailHighlight>
              </DetailTabCell>
              <DetailTabCell>
                <p>{data?.landmark?.phoneNo}</p>
              </DetailTabCell>
            </DetailTabRow>
          </DetailContent>
        </DetailContainer>
      </LandmarkContainer>
      <ReviewSection id={id} />
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
  background-image: url(${(props) => props.img});
  background-size: cover;
  background-repeat: no-repeat;
`;

const DetailContainer = styled.div`
  width: 50%;
  padding: 10% 8%;
`;

const DetailTitle = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.xxxl};
  font-weight: bold;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5%;
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

export default Landmark;
