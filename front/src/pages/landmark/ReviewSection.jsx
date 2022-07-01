import styled from "styled-components";
import { StarRating } from "./StarRating";
import ReviewCounts from "./ReviewCounts";
import ReviewList from "./ReviewList";
import ReviewForm from "./ReviewForm";
import { useGetRatingInfo } from "queries/reviewQuery";
import Loader from "components/loader";

const ReviewSection = ({ id }) => {
  const { data, status } = useGetRatingInfo(id);

  const { totalReview, avgRating } = data?.rating || {};

  if (status === "loading") return <Loader />;

  return (
    <ReviewContainer>
      <ReviewHeader>
        후기 <Highlighted>{totalReview}</Highlighted>
      </ReviewHeader>
      <RatingContainer>
        <RatingMean>
          <div style={{ fontSize: "3rem" }}>{avgRating}</div>
          <StarRating number={5} />
        </RatingMean>
        <CountsContainer>
          <CountsContent>
            {data &&
              data.rating.starRating.map((data) => (
                <ReviewCounts
                  data={data}
                  key={data.star}
                  totalReview={totalReview}
                />
              ))}
          </CountsContent>
        </CountsContainer>
      </RatingContainer>
      <ReviewList id={id} />
      <ReviewForm id={id} />
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
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CountsContent = styled.div`
  height: 200px;
  display: table;
  width: 100%;
`;

const ReviewContainer = styled.div`
  padding: 0 5%;
`;

export default ReviewSection;
