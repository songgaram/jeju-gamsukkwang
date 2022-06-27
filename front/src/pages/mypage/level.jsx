import { useState, useEffect } from "react";
import styled from "styled-components";
import { Icon } from "assets/svgs/index";

const Level = ({ data }) => {
  const { experience } = data?.userState || {};
  const [leftExp, setLeftExp] = useState(10);
  const [curExp, setCurExp] = useState(0);

  useEffect(() => {
    if (experience) {
      const currentExp = parseInt(experience) % 10;
      setCurExp(parseInt(experience) % 10);
      setLeftExp(10 - currentExp);
    }
  }, [experience]);

  return (
    <LevelBox>
      <FigureBox>
        <Desc>
          {leftExp} <Icon /> until Next Level
        </Desc>
        <ProgressBar value={curExp} max="10" />
      </FigureBox>
      <Number>
        <Emphasized>{curExp}</Emphasized> / 10
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
      background-color: ${({ theme }) => theme.colors.gray02};
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
