import { useNavigate } from "react-router-dom";

import { useGetList } from "queries/recommendQuery";

import { Card, TextBox, ImgBox, Img } from "./card.style";
import Loader from "components/loader";

const RecommendCard = ({ isSelected }) => {
  const navigate = useNavigate();

  const List = useGetList(isSelected);

  const handleClick = (tourId) => {
    navigate(`/landmark/detail/${tourId}`);
  };

  if (!List.data) return <span>loading...</span>;

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
