import styled from "styled-components";
import { useState } from "react";
import { ReviewFormContainer, InputForm, Footer } from "./landmark.style";
import Button from "components/Button";

const ReviewEditForm = () => {
  const [content, setContent] = useState("");

  const handleSubmitReview = (e) => {
    e.preventDefault();
  };

  return (
    <ReviewFormContainer onSubmit={handleSubmitReview}>
      <InputForm
        maxlength="1000"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <Footer>
        <div>{content.length}/1000</div>
        <Button color="deepblue" type="submit" onSubmit={handleSubmitReview}>
          리뷰 등록
        </Button>
      </Footer>
    </ReviewFormContainer>
  );
};

export default ReviewEditForm;
