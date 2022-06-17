import styled from "styled-components";
import StarRating from "./StarRating";
import ReviewCounts from "./ReviewCounts";
import ReviewList from "./ReviewList";
import ReviewForm from "./ReviewForm";
import { useGetRatingInfo } from "queries/reviewQuery";

const ReviewSection = ({ id }) => {
  const { data } = useGetRatingInfo(id);
  const totalReview = data?.rating?.totalReview;
  return (
    <ReviewContainer>
      <ReviewHeader>
        후기 <Highlighted>{data?.rating?.totalReview}</Highlighted>
      </ReviewHeader>
      <RatingContainer>
        <RatingMean>
          <div style={{ fontSize: "3rem" }}>4.9</div>
          <StarRating number={5} />
        </RatingMean>
        <CountsContainer>
          {data &&
            data.rating.starRating.map((data) => (
              <ReviewCounts
                data={data}
                key={data.star}
                totalReview={totalReview}
              />
            ))}
        </CountsContainer>
      </RatingContainer>
      <ReviewList id={id} />
      <ReviewForm />
    </ReviewContainer>
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
`;

const RatingMean = styled.div`
  width: 35%;
  background-color: ${({ theme }) => theme.colors.gray01};
  margin-right: 1%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const CountsContainer = styled.div`
  width: 65%;
  background-color: ${({ theme }) => theme.colors.gray01};
  display: table;
`;

const ReviewContainer = styled.div`
  padding: 0 5%;
`;

export default ReviewSection;
