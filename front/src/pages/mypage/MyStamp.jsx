import { Icon } from "assets/svgs/index";
import { useEffect } from "react";
import styled from "styled-components";
import { stampList } from "./state";
import { useRecoilValue } from "recoil";

const MyStamp = () => {
  const newArr = new Array(60).fill(true);
  const stampedList = useRecoilValue(stampList);

  useEffect(() => {});

  return (
    <Container>
      <IconContainer>
        {newArr.map((stamping, idx) => (
          <Stamp key={idx} stamping={stamping} />
        ))}
      </IconContainer>
    </Container>
  );
};
const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const IconContainer = styled.div`
  width: 1000px;
  display: flex;
  flex-wrap: wrap;
  gap: 5%;
`;

const Stamp = styled(Icon)`
  -webkit-filter: grayscale(100%);
  filter: ${(props) => (props.stamping ? "grayscale(0)" : "grayscale(100%)")};
`;

export default MyStamp;
