import styled, { css } from "styled-components";
import theme from "styles/Theme";
import StarRating from "./StarRating";

export const ReviewCard = () => {
  return (
    <ReviewCardContainer>
      <CardHeader>
        <StarRating number={5} color={theme.colors.secondary} />
        <CardText>가라미</CardText>
        <CardText color="gray03">2022-02-20</CardText>
      </CardHeader>
      <CardContent>
        <CardText>
          유익한 시간이었구 제주도는 정말 오랜만이었는데 힐링되고 자연이 최고
          인거 같습니다~ 추천해요!
        </CardText>
      </CardContent>
    </ReviewCardContainer>
  );
};

const ReviewCardContainer = styled.div`
  width: 100%;
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
