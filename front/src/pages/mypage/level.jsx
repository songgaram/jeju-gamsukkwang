import styled from "styled-components";
import { Icon } from "assets/svgs/index";

const Level = () => {
  return (
    <LevelBox>
      <FigureBox>
        <Desc>
          12 <Icon /> until Next Level
        </Desc>
        <ProgressBar value="8" max="20" />
      </FigureBox>
      <Number>
        <Emphasized>8</Emphasized> / 20
      </Number>
    </LevelBox>
  );
};

const LevelBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const FigureBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  progress[value] {
    appearance: none;
    width: 25rem;
    height: 25px;

    ::-webkit-progress-bar {
      background-color: #dedede;
      border-radius: 20px;
    }

    ::-webkit-progress-value {
      background-color: ${({ theme }) => theme.colors.orange};
      border-radius: 20px;
    }
  }
`;

const Desc = styled.div`
  color: ${({ theme }) => theme.colors.orange};
  font-weight: bold;
  font-size: 2.5rem;
  margin-bottom: 15px;
`;

const Number = styled.div`
  width: 150px;
  color: ${({ theme }) => theme.colors.orange};
  font-size: 2.5rem;
  font-weight: bold;
  margin-left: 25px;
`;

const Emphasized = styled.span`
  color: ${({ theme }) => theme.colors.black};
  font-size: 3rem;
`;

const ProgressBar = styled.progress``;

export default Level;
