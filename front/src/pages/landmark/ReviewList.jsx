import ReviewCard from "./ReviewCard";
import { useGetReviewList } from "queries/reviewQuery";
import React from "react";

const ReviewList = ({ id }) => {
  const { data } = useGetReviewList(id);

  return (
    <div>
      {data?.pages?.map((page, idx) => (
        <React.Fragment key={idx}>
          {page.reviews?.map((review, idx) => (
            <React.Fragment key={review._id}>
              <ReviewCard review={review} idx={idx} />
            </React.Fragment>
          ))}
        </React.Fragment>
      ))}
    </div>
  );
};

export default ReviewList;
