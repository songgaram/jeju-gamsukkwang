import { useState } from "react";
import styled from "styled-components";
import {
  ReviewFormContainer,
  InputForm,
  Footer,
  StarContainer,
} from "./landmark.style";
import { BsStarFill } from "react-icons/bs";
import Button from "components/Button";
import registerValidation from "./utils";
import { usePostReview } from "queries/reviewQuery";
import { TEXT_LIST, MODAL_MESSAGE } from "./constants";
import Modal from "components/modal";
import ModalPortal from "components/modal/modalPortal";

const ReviewForm = ({ id }) => {
  const [hovered, setHovered] = useState(null);
  const [clicked, setClicked] = useState(null);
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(undefined);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { isRatingValid, isContentValid } = registerValidation(rating, content);
  const isActive = isRatingValid && isContentValid;
  const postReview = usePostReview();

  const handleSubmitReview = (e) => {
    e.preventDefault();
    const review = {
      tourId: id,
      content,
      rating,
    };
    postReview.mutate(review, {
      onError: (err) => {
        if (err.response.data.errormessage === "system.error.alreadyPosting") {
          setIsOpenModal(true);
          return;
        }
        console.log(err);
      },
    });
    setContent("");
  };

  return (
    <>
      <ReviewFormContainer onSubmit={handleSubmitReview}>
        <HeaderContainer align="center" justify="center">
          <Title>랜드마크를 평가해주세요!</Title>
          <Required>필수</Required>
        </HeaderContainer>

        <StarContainer>
          {[1, 2, 3, 4, 5].map((el) => (
            <BsStarFill
              color={(clicked >= el) | (hovered >= el) ? "#AAD8FE" : "#dedede"}
              key={el}
              size={`${50 / 16}rem`}
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
        <div style={{ position: "relative" }}>
          {[1, 2, 3, 4, 5].map((num) => (
            <HiddenText key={num} show={hovered === num}>
              {TEXT_LIST[num - 1]}
            </HiddenText>
          ))}
        </div>

        <HeaderContainer align="center">
          <Title>다른 여행객을 위한 후기와 팁</Title>
          <Required>필수</Required>
        </HeaderContainer>
        <InputForm
          maxlength="1000"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <Footer>
          <div>{content.length}/1000</div>
          <Button
            color="deepblue"
            type="submit"
            disabled={!isActive}
            onSubmit={handleSubmitReview}
          >
            리뷰 등록
          </Button>
        </Footer>
      </ReviewFormContainer>
      <ModalPortal>
        {isOpenModal && (
          <Modal setIsOpenModal={setIsOpenModal} modalMessage={MODAL_MESSAGE} />
        )}
      </ModalPortal>
    </>
  );
};

const HeaderContainer = styled.div`
  display: flex;
  justify-content: ${(props) => props.justify};
  align-items: ${(props) => props.align};
  margin-top: 10%;
`;

const Title = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.xxxl};
  font-weight: bold;
  margin-right: 0.5%;
`;

const Required = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.base};
  color: ${({ theme }) => theme.colors.secondary};
  font-weight: bold;
`;

const HiddenText = styled.p`
  position: absolute;
  top: 10px;
  left: 50%;
  text-align: center;
  width: 130px;
  height: 30px;
  transform: translate(-50%, -50%);
  color: ${({ theme }) => theme.colors.gray03};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  ${({ show }) => (show ? `display:block` : `display: none`)}
`;

export default ReviewForm;
