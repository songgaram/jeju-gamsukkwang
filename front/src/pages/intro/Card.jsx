import { CardWrapper, CardTitle, CardSubtitle } from "./intro.style";

const Card = ({ title, subtitle1, subtitle2 }) => {
  return (
    <CardWrapper>
      <CardTitle>{title}</CardTitle>
      <CardSubtitle>{subtitle1}</CardSubtitle>
      <CardSubtitle>{subtitle2}</CardSubtitle>
    </CardWrapper>
  );
};

export default Card;
