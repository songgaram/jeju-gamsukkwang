import { TangerineIcon } from "assets/svgs/index";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { userState } from "states";
import { useRecoilValue } from "recoil";

const MyStamp = () => {
  const newArr = new Array(60).fill(false);
  const curUserState = useRecoilValue(userState);
  const { stamp } = curUserState || {};
  const stampCount = stamp.length;
  const [stampList, setStampedList] = useState(newArr);

  useEffect(() => {
    setStampedList([...stamp, ...newArr.slice(stampCount)]);
  }, []);

  return (
    <Container>
      <IconContainer>
        {stampList.map((tourId, idx) => (
          <div key={idx}>
            <Stamp key={idx} tourId={tourId} />
          </div>
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
  row-gap: 5%;

  & > div {
    position: relative;
    width: 10%;
    text-align: center;
  }
`;

const Stamp = styled(TangerineIcon)`
  max-width: 80%;
  -webkit-filter: grayscale(100%);
  filter: ${(props) => (props.tourId ? "grayscale(0)" : "grayscale(100%)")};
`;

export default MyStamp;
