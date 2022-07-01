import styled from "styled-components";
import { useState } from "react";
import {
  ReviewFormContainer,
  InputForm,
  Footer,
  StarContainer,
} from "./landmark.style";
import Button from "components/button/Button";
import { BsStarFill } from "react-icons/bs";

const ReviewEditForm = () => {
  const [content, setContent] = useState("");
  const [hovered, setHovered] = useState(null);
  const [clicked, setClicked] = useState(null);
  const [rating, setRating] = useState(undefined);
  const handleSubmitReview = (e) => {
    e.preventDefault();
  };

  return (
    <ReviewFormContainer onSubmit={handleSubmitReview}>
      <StarContainer>
        {[1, 2, 3, 4, 5].map((el) => (
          <BsStarFill
            color={(clicked >= el) | (hovered >= el) ? "#AAD8FE" : "#dedede"}
            key={el}
            onMouseEnter={() => setHovered(el)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => {
              setClicked(el);
              setRating(el);
            }}
            cursor="pointer"
          />
        ))}
      </StarContainer>
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
