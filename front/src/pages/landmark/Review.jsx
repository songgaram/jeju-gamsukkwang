import styled from "styled-components";

const Review = () => {
  return (
    <>
      <RatingContainer>rating</RatingContainer>
      <ReviewContainer>리뷰</ReviewContainer>
    </>
  );
};

const RatingContainer = styled.div`
  width: 100%;
  height: 300px;
  display: flex;
  flex-direction: row;
  background-color: ivory;
`;

const ReviewContainer = styled.div`
  width: 100%;
  height: 500px;
  background-color: gray;
`;

export default Review;
