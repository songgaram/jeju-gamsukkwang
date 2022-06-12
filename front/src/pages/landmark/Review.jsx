import styled from "styled-components";
import StarRating from "./StarRating";

const Review = () => {
  return (
    <>
      <RatingHeader>
        후기 <Highlighted>114</Highlighted>
      </RatingHeader>
      <RatingContainer>
        <RatingMean>
          <div style={{ fontSize: "3rem" }}>4.9</div>
          <StarRating number={10} />
        </RatingMean>
        <RatingDetail>Detail</RatingDetail>
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

const RatingDetail = styled.div`
  width: 60%;
  background-color: ${({ theme }) => theme.colors.gray01};
`;

const ReviewContainer = styled.div`
  width: 100%;
  height: 500px;
  background-color: gray;
`;

export default Review;
