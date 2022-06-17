import styled, { css } from "styled-components";
import theme from "styles/Theme";
import { StarRatingWithEmpty } from "./StarRating";

export const ReviewCard = ({ review, idx }) => {
  const { userNickName, content, rating, createdAt } = review;
  return (
    <ReviewCardContainer idx={idx}>
      <CardHeader>
        <StarRatingWithEmpty number={rating} />
        <CardText>{userNickName}</CardText>
        <CardText color="gray03">{createdAt.slice(0, 10)}</CardText>
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
    props.idx === 0 ? "none" : `1px dashed ${theme.colors.secondary}`};
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

export default ReviewCard;
