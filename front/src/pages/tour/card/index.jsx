import styled from "styled-components";
import { css } from "styled-components";

const DATA = [
  {
    _id: "62a14e4c8ff9a72ed84482da",
    id: "011bcd14-2cc7-4195-9ec9-747e4fb1838a",
    krTitle: "검멀레동굴검멀레동굴검멀레동굴검멀레동굴검멀레동굴",
    address: "제주특별자치도 제주시 우도면",
    description:
      "우도 8경 중 7경에 속하는 검은 모래가 있는 해안과 특이한 지형의 검멀레동굴",
    image:
      "https://api.cdn.visitjeju.net/photomng/thumbnailpath/202112/06/055468e4-33bc-425a-8a16-81baa2a9d821.JPG",
    phoneNo: "--",
    likeCount: 0,
    likedUsers: [],
    __v: 0,
  },
  {
    _id: "62a14e788ff9a72ed84482dc",
    id: "38720ff4-e68b-406f-b58c-74071e80d456",
    krTitle: "곽지해수욕장",
    address: "제주특별자치도 제주시 애월읍 애월원당길 (곽지리)",
    description: "시원한 용천수를 뿜어내는 노천탕이 있는 곳",
    image:
      "https://api.cdn.visitjeju.net/photomng/thumbnailpath/202110/25/51ef76f8-3171-4261-8423-a58df63d40aa.jpg",
    phoneNo: "064-728-3985",
    likeCount: 0,
    likedUsers: [],
    __v: 0,
  },
  {
    _id: "62a14ebe8ff9a72ed84482de",
    id: "71ab3a6a-2034-45b2-b4ed-f6b29af6de84",
    krTitle: "금능해수욕장",
    address: "제주특별자치도 제주시 한림읍 금능길 119-10",
    description:
      "제주시 한림읍에 위치한 금능해수욕장은 서쪽의 인기 명소인 협재해수욕장과 바로 이어져 있다. 파란 물감을 풀어놓은 것 같은 바다부터 생김새가 귀여운 비양도, 촉감이 보슬거리는 모래사장까지 이웃한 해변과 비슷한 풍경을 품고 있지만 그보다 사람이 붐비지 않아 여유로운 것이 매력이다. ",
    image:
      "https://api.cdn.visitjeju.net/photomng/thumbnailpath/202110/25/120296bb-0959-4579-ad37-c559e95b434c.JPG",
    phoneNo: "064-728-3983",
    likeCount: 0,
    likedUsers: [],
    __v: 0,
  },
  {
    _id: "62a14edf8ff9a72ed84482e0",
    id: "490b280f-3559-4e02-8e19-4455bedc5a81",
    krTitle: "제주김녕미로공원",
    address: "제주특별자치도 제주시 구좌읍 만장굴길 122",
    description: "사계절 푸르른 랠란디나무로 이루어진 우리나라 최초의 미로공원",
    image:
      "https://api.cdn.visitjeju.net/photomng/thumbnailpath/201804/30/928e3894-81a4-4d38-b72f-67d3c5fd6f72.gif",
    phoneNo: "064-782-9266",
    likeCount: 0,
    likedUsers: [],
    __v: 0,
  },
];

const RecommendCard = () => {
  return (
    <>
      {DATA.map((data) => (
        <Card key={data.id}>
          <Img src={data.image} alt="랜드마크 이미지" />
          <p>{data.krTitle}</p>
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

  p {
    display: flex;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

const Img = styled.img`
  width: 250px;
  height: 170px;
  border-radius: 5px 5px 0 0;
`;
