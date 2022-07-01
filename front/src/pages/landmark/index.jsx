import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "components/Button";
import ReviewSection from "./ReviewSection";
import { useGetLandmark } from "queries/landmarkQuery";

const Landmark = () => {
  const params = useParams();
  const id = params.id;
  const { data } = useGetLandmark(id);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/map/${data?.landmark?.id}`);
  };

  return (
    <>
      <LandmarkContainer>
        <ImgContainer img={data?.landmark?.image} />
        <DetailContainer>
          <Header>
            <DetailTitle>{data?.landmark?.krTitle}</DetailTitle>
            <Button color="gray03" onClick={handleClick}>
              길찾기
            </Button>
          </Header>

          <DetailContent>
            <DetailTabRow>
              <DetailTabHead>
                <DetailHighlight>주소</DetailHighlight>
              </DetailTabHead>
              <DetailTabCell>
                <p>{data?.landmark?.address}</p>
              </DetailTabCell>
            </DetailTabRow>
            <DetailTabRow>
              <DetailTabHead>
                <DetailHighlight>소개</DetailHighlight>
              </DetailTabHead>
              <DetailTabCell>
                <p>{data?.landmark?.description}</p>
              </DetailTabCell>
            </DetailTabRow>
            <DetailTabRow>
              <DetailTabHead>
                <DetailHighlight>연락처</DetailHighlight>
              </DetailTabHead>
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 5%;
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
  border-spacing: 10px;
`;

const DetailTabRow = styled.div`
  display: table-row;
`;

const DetailTabCell = styled.div`
  display: table-cell;
  width: 80%;
`;

const DetailTabHead = styled.div`
  display: table-cell;
  width: 20%;
`;

export default Landmark;
