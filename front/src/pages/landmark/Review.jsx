import styled from "styled-components";
import StarRating from "./StarRating";
// import { DetailContent, DetailTabRow, DetailTabCell } from "./landmark.style";

const Review = () => {
  return (
    <>
      <RatingHeader>
        후기 <Highlighted>114</Highlighted>
      </RatingHeader>
      <RatingContainer>
        <RatingMean>
          <div style={{ fontSize: "3rem" }}>4.9</div>
          <StarRating number={5} />
        </RatingMean>
        <CountsContainer>
          <CountsDeatil>
            <DetailTabCell>
              <StarRating number={5} color="#AAD8FE" />
            </DetailTabCell>
            <DetailTabCell>
              <BarContainer>
                <Bar />
              </BarContainer>
            </DetailTabCell>
            <DetailTabCell>
              <CountsInfo>54</CountsInfo>
            </DetailTabCell>
          </CountsDeatil>
          <CountsDeatil>
            <DetailTabCell>
              <StarRating number={5} color="#AAD8FE" />
            </DetailTabCell>
            <DetailTabCell>
              <BarContainer>
                <Bar />
              </BarContainer>
            </DetailTabCell>
            <DetailTabCell>
              <CountsInfo>54</CountsInfo>
            </DetailTabCell>
          </CountsDeatil>
          <CountsDeatil>
            <DetailTabCell>
              <StarRating number={5} color="#AAD8FE" />
            </DetailTabCell>
            <DetailTabCell>
              <BarContainer>
                <Bar />
              </BarContainer>
            </DetailTabCell>
            <DetailTabCell>
              <CountsInfo>54</CountsInfo>
            </DetailTabCell>
          </CountsDeatil>
        </CountsContainer>
      </RatingContainer>
      <ReviewContainer>리뷰</ReviewContainer>
    </>
  );
};

const RatingHeader = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.xxxl};
  font-weight: bold;
  margin-bottom: 1%;
`;

const Highlighted = styled.span`
  color: ${({ theme }) => theme.colors.secondary};
`;

const RatingContainer = styled.div`
  width: 100%;
  height: 300px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  background-color: ivory;
`;

const RatingMean = styled.div`
  width: 30%;
  background-color: ${({ theme }) => theme.colors.gray01};
  margin-right: 1%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const CountsContainer = styled.div`
  width: 60%;
  background-color: ${({ theme }) => theme.colors.gray01};
  display: table;
`;

const CountsDeatil = styled.div`
  display: table-row;
`;

const DetailTabCell = styled.div`
  display: table-cell;
`;

const BarContainer = styled.div`
  width: 150px;
  height: 6px;
  background-color: ${({ theme }) => theme.colors.gray02};
  border-radius: 4px;
  position: relative;
`;

const Bar = styled.div`
  width: 80%;
  height: 6px;
  background-color: ${({ theme }) => theme.colors.secondary};
  border-radius: 4px;
  display: inline-block;
  position: absolute;
  top: 0;
`;

const CountsInfo = styled.div`
  color: ${({ theme }) => theme.colors.gray03};
`;

const ReviewContainer = styled.div`
  width: 100%;
  height: 500px;
  background-color: gray;
`;

export default Review;
