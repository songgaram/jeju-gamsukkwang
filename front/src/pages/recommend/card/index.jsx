import styled from "styled-components";
import { css } from "styled-components";

import { useGetRecommendLikes } from "queries/recommendQuery";

const RecommendCard = () => {
  const List = useGetRecommendLikes();

  if (!List.data) return <div>데이터가 없습니다</div>;

  return (
    <>
      {List.data.map((data) => (
        <Card key={data.id}>
          <Img src={data.image} alt="랜드마크 이미지" />
          <TextBox>
            <p>{data.krTitle}</p>
          </TextBox>
        </Card>
      ))}
      <Card ghost />
      <Card ghost />
      <Card ghost />
    </>
  );
};

export default RecommendCard;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  width: 250px;
  height: 230px;
  margin: 20px;
  background: white;
  border-radius: 5px;
  box-shadow: 0px 3px 12px rgba(0, 0, 0, 6%);
  cursor: pointer;
  ${(props) =>
    props.ghost &&
    css`
      height: 1px;
      opacity: 0;
      pointer-events: none;
    `}
`;

const TextBox = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 60px;
  padding: 0 20px;
`;

const Img = styled.img`
  width: 250px;
  height: 170px;
  border-radius: 5px 5px 0 0;
`;
