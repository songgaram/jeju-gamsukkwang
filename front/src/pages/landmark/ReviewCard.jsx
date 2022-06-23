import styled, { css } from "styled-components";
import { StarRatingWithEmpty } from "./StarRating";
import { AiFillDelete } from "react-icons/ai";
import { RiEdit2Fill } from "react-icons/ri";
import { useDeleteReview } from "queries/reviewQuery";

export const ReviewCard = ({ review, idx }) => {
  const { userNickName, content, rating, createdAt, id } = review;
  const deleteReview = useDeleteReview();

  const deleteReviewHandler = () => {
    deleteReview.mutate(id);
  };

  return (
    <ReviewCardContainer idx={idx}>
      <CardHeader>
        <StarRatingWithEmpty number={rating} />
        <CardText>{userNickName}</CardText>
        <CardText color="gray03">{createdAt.slice(0, 10)}</CardText>
        <IconContainer>
          <RiEdit2Fill size="1.7rem" cursor="pointer" />
          <TrashBox size="1.7rem" onClick={deleteReviewHandler} />
        </IconContainer>
      </CardHeader>
      <CardContent>
        <CardText>{content}</CardText>
      </CardContent>
    </ReviewCardContainer>
  );
};

const ReviewCardContainer = styled.div`
  width: 100%;
  border-top: ${(props) =>
    props.idx === 0 ? "none" : `1px dashed ${props.theme.colors.secondary}`};
`;

const CardHeader = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 5% 1% 0 0;
`;

const CardContent = styled.div`
  width: 100%;
  padding: 5% 0;
`;

const CardText = styled.p`
  ${(props) => {
    const selected = props.theme.colors[props.color];
    return css`
      color: ${selected};
    `;
  }}
  margin-left: 1%;
`;

const IconContainer = styled.div`
  margin-left: auto;
  width: auto;
`;

const TrashBox = styled(AiFillDelete)`
  cursor: pointer;
  margin-left: 5px;
`;

export default ReviewCard;
