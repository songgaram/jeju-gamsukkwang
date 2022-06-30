import { TangerineIcon } from "assets/svgs/index";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { useGetUserInfo } from "queries/userQuery";
import Loader from "components/loader";

const MyStamp = () => {
  const newArr = new Array(60).fill(false);
  const { data, status } = useGetUserInfo();
  const { stamp } = data?.userState || {};
  const stampCount = stamp.length;
  const [stampList, setStampedList] = useState(newArr);

  useEffect(() => {
    setStampedList([...stamp, ...newArr.slice(stampCount)]);
  }, []);

  if (status === "loading") return <Loader />;

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
