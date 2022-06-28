import styled from "styled-components";
import { LEVEL_LIST } from "./constants";
import { levelState } from "./state";
import { useRecoilValue } from "recoil";
import Button from "components/Button";

const Profile = ({ email, nickname }) => {
  const level = useRecoilValue(levelState);

  const handleClick = () => {
    return;
  };

  return (
    <ProfileBox>
      <ProfileImg src="https://dev-team8-bucket.s3.ap-northeast-2.amazonaws.com/profileImg.png" />

      <InfoBox>
        <NickName>{nickname}</NickName>
        <Email>{email}</Email>
        <Level>
          Lv. <Coloring>{LEVEL_LIST[level].level}</Coloring>
        </Level>
        <div>
          <Button onClick={handleClick}>회원정보 수정</Button>
        </div>
      </InfoBox>
    </ProfileBox>
  );
};

const ProfileBox = styled.div`
  display: flex;
  flex-direction: row;
  padding-left: 15px;
`;

const ProfileImg = styled.img.attrs({ alt: "프로필 이미지" })`
  width: 10rem;
  height: 10rem;
  border-radius: 50%;
`;

const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 2rem;
  justify-content: space-evenly;
`;

const NickName = styled.div`
  font-weight: bold;
  font-size: ${({ theme }) => theme.fontSizes.xxl};
`;
const Email = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.xxl};
`;
const Level = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.xxl};
  font-weight: bold;
`;

const Coloring = styled.span`
  color: ${({ theme }) => theme.colors.orange};
`;

export default Profile;
