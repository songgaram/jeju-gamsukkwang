import styled from "styled-components";
import StarRating from "./StarRating";

const ReviewCounts = ({ data }) => {
  return (
    <CountsDeatil>
      <DetailTabCell align="right" width="20">
        <StarRating number={data.star} color="#AAD8FE" />
      </DetailTabCell>
      <DetailTabCell width="60">
        <BarContainer>
          <Bar width={((data.review / data.totalReview) * 100).toFixed(2)} />
        </BarContainer>
      </DetailTabCell>
      <DetailTabCell align="left" width="20">
        <CountsInfo>{data.review}</CountsInfo>
      </DetailTabCell>
    </CountsDeatil>
  );
};

const CountsDeatil = styled.div`
  display: table-row;
`;

const DetailTabCell = styled.div`
  display: table-cell;
  text-align: ${(props) => props.align};
  width: ${(props) => props.width}%;
  vertical-align: middle;
`;

const BarContainer = styled.div`
  width: 230px;
  height: 6px;
  background-color: ${({ theme }) => theme.colors.gray02};
  border-radius: 4px;
  position: relative;
`;

const Bar = styled.div`
  width: ${(props) => props.width}%;
  height: 6px;
  background-color: ${({ theme }) => theme.colors.secondary};
  border-radius: 4px;
  display: inline-block;
  position: absolute;
  top: 0;
`;

const CountsInfo = styled.div`
  color: ${({ theme }) => theme.colors.gray03};
`;

export default ReviewCounts;
