import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";

import { filterStatus } from "../states";
// import { useGetLikes } from "queries/recommendQuery";

import { Card, TextBox, ImgBox, Img } from "./card.style";
import { useGetQuery } from "./utils";

const RecommendCard = () => {
  const navigate = useNavigate();
  const dataKey = useRecoilValue(filterStatus);

  const List = useGetQuery(dataKey);

  const handleClick = (tourId) => {
    navigate(`/landmark/detail/${tourId}`);
  };

  if (!List.data) return <div>데이터가 없습니다</div>;

  return (
    <>
      {List.data.map((data) => (
        <Card key={data.id} onClick={() => handleClick(data.id)}>
          <ImgBox>
            <Img src={data.image} alt="랜드마크 이미지" />
          </ImgBox>
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
