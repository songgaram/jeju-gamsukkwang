import { CardWrapper, CardTitle, CardSubtitle } from "./intro";

export default function Card({ title, subtitle1, subtitle2 }) {
  return (
    <CardWrapper>
      <CardTitle>{title}</CardTitle>
      <CardSubtitle>{subtitle1}</CardSubtitle>
      <CardSubtitle>{subtitle2}</CardSubtitle>
    </CardWrapper>
  );
}
