import styled from "styled-components";
import { InputForm, Footer } from "./landmark.style";
import Button from "components/Button";

const ReviewEditForm = () => {
  return (
    <>
      <InputForm
        maxlength="1000"
        // value={curContent}
        // onChange={(e) => setCurContent(e.target.value)}
      />
      <Footer>
        {/* <div>{curContent.length}/1000</div> */}
        <Button
          color="deepblue"
          type="submit"
          //   disabled={!isActive}
          //   onSubmit={submitReview}
        >
          리뷰 등록
        </Button>
      </Footer>
    </>
  );
};

export default ReviewEditForm;
