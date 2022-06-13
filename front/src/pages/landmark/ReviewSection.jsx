import styled from "styled-components";
import StarRating from "./StarRating";
import ReviewCounts from "./ReviewCounts";

const DataSet = [
  {
    totalReview: 114,
    star: 5,
    review: 80,
  },

  {
    totalReview: 114,
    star: 4,
    review: 20,
  },
  {
    totalReview: 114,
    star: 3,
    review: 8,
  },
  {
    totalReview: 114,
    star: 2,
    review: 6,
  },
  {
    totalReview: 114,
    star: 1,
    review: 0,
  },
];

const ReviewSection = () => {
  return (
    <>
      <ReviewHeader>
        후기 <Highlighted>114</Highlighted>
      </ReviewHeader>
      <RatingContainer>
        <RatingMean>
          <div style={{ fontSize: "3rem" }}>4.9</div>
          <StarRating number={5} />
        </RatingMean>
        <CountsContainer>
          {DataSet.map((data) => (
            <ReviewCounts data={data} key={data.star} />
          ))}
        </CountsContainer>
      </RatingContainer>
      <ReviewContainer>리뷰</ReviewContainer>
    </>
  );
};

const ReviewHeader = styled.div`
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

const ReviewContainer = styled.div`
  width: 100%;
  height: 500px;
  background-color: gray;
`;

export default ReviewSection;
