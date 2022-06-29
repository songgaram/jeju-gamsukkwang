import { useState, useEffect } from "react";
import styled from "styled-components";
import { TangerineIcon } from "assets/svgs/index";
import { ImgInputButton } from "./mypage.style";
import { useCallback } from "react";
import { useRef } from "react";
import http from "libs/apiController";
import Modal from "./modal";
import ModalPortal from "components/modal/modalPortal";

const Level = ({ experience }) => {
  const [leftExp, setLeftExp] = useState(10);
  const [curExp, setCurExp] = useState(0);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const photoInput = useRef(null);

  useEffect(() => {
    if (experience) {
      const currentExp = parseInt(experience) % 10;
      setCurExp(parseInt(experience) % 10);
      setLeftExp(10 - currentExp);
    }
  }, [experience]);

  const handleUploadImage = useCallback(async (e) => {
    if (!e.target.files) return;

    const formData = new FormData();
    formData.append("imgFile", e.target.files[0]);

    try {
      setIsOpenModal(true);
      setIsLoading(true);
      const res = await http.post("tour/image", formData);
      setIsLoading(false);
      const name = res.data.data.summary[0].categoryName;
      const response = await http.get(`tour/search?name=${name}`);
      setData(response.data[0]);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    console.log("data", data);
  }, [data]);

  return (
    <>
      <LevelContainer>
        <LevelBox>
          <FigureBox>
            <Desc>
              {leftExp} <TangerineIcon /> until Next Level
            </Desc>
            <ProgressBar value={curExp} max="10" />
          </FigureBox>
          <Number>
            <Emphasized>{curExp}</Emphasized> / 10
          </Number>
        </LevelBox>

        <ImgInputButton>
          📷 랜드마크 인증하고 스탬프 찍기!
          <input
            type="file"
            accept="image/*"
            ref={photoInput}
            onChange={handleUploadImage}
          />
        </ImgInputButton>
      </LevelContainer>
      <ModalPortal>
        {isOpenModal && (
          <Modal
            setIsOpenModal={setIsOpenModal}
            isLoading={isLoading}
            data={data}
          />
        )}
      </ModalPortal>
    </>
  );
};

const LevelContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const LevelBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 5%;
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
  width: 100px;
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
