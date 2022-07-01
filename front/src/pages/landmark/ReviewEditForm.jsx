import { useState } from "react";
import {
  ReviewFormContainer,
  InputForm,
  Footer,
  StarContainer,
} from "./landmark.style";
import Button from "components/button/Button";
import { BsStarFill } from "react-icons/bs";
import { useUpdateReview } from "queries/reviewQuery";
import { CardHeader, CardText } from "./landmark.style";

const ReviewEditForm = ({ review, setIsEditing }) => {
  const { userNickName, content, rating, createdAt, id } = review;

  const [editContent, setEditContent] = useState(content);
  const [hovered, setHovered] = useState(null);
  const [clicked, setClicked] = useState(rating);
  const [editRating, setEditRating] = useState(rating);

  const updateReview = useUpdateReview(id);

  const handleEditReview = (e) => {
    e.preventDefault();

    const review = {
      content: editContent,
      rating: Number(editRating),
    };

    updateReview.mutate(review);
    setIsEditing(false);
  };

  return (
    <ReviewFormContainer onSubmit={handleEditReview}>
      <CardHeader>
        <StarContainer>
          {[1, 2, 3, 4, 5].map((el) => (
            <BsStarFill
              color={(clicked >= el) | (hovered >= el) ? "#AAD8FE" : "#dedede"}
              key={el}
              onMouseEnter={() => setHovered(el)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => {
                setClicked(el);
                setEditRating(el);
              }}
              cursor="pointer"
            />
          ))}
        </StarContainer>
        <CardText>{userNickName}</CardText>
        <CardText color="gray03">{createdAt.slice(0, 10)}</CardText>
      </CardHeader>

      <InputForm
        maxLength="1000"
        value={editContent}
        onChange={(e) => setEditContent(e.target.value)}
      />
      <Footer>
        <div>{editContent.length}/1000</div>
        <Button
          color="primary"
          type="submit"
          onSubmit={() => setIsEditing(false)}
        >
          취소
        </Button>
        <Button color="deepblue" type="submit" onSubmit={handleEditReview}>
          수정 완료
        </Button>
      </Footer>
    </ReviewFormContainer>
  );
};

export default ReviewEditForm;
