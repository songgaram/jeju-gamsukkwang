import styled from "styled-components";

const Level = () => {
  return (
    <LevelBox>
      <FigureContainer>
        <Desc>12 until Next Level</Desc>
        <ProgressBar value="8" max="20"></ProgressBar>
      </FigureContainer>
      <Number>8 / 20</Number>
    </LevelBox>
  );
};

const LevelBox = styled.div`
  border: 1px solid blue;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const FigureContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  progress[value] {
    appearance: none;
    width: 35rem;
    height: 20px;

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
  font-size: 3rem;
  margin-bottom: 15px;
`;

const Number = styled.div``;

const ProgressBar = styled.progress``;

export default Level;
