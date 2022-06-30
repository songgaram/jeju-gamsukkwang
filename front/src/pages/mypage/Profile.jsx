import styled from "styled-components";
import { useState } from "react";
import { LEVEL_LIST } from "./constants";
import Button from "components/Button";
import { InfoBox, NickName, Email, Level, Coloring } from "./mypage.style";
import ProfileEditForm from "./ProfileEditForm";

const Profile = ({ email, nickname, experience }) => {
  const level = parseInt(parseInt(experience) / 10);
  const [editing, setEditing] = useState(false);
  const [editNickname, setEditNickname] = useState(nickname || "");

  const handleClick = () => {
    setEditing(true);
  };

  return (
    <ProfileBox>
      <ProfileImg src="https://dev-team8-bucket.s3.ap-northeast-2.amazonaws.com/profileImg.png" />
      {editing ? (
        <ProfileEditForm
          email={email}
          level={level}
          setEditing={setEditing}
          editNickname={editNickname}
          setEditNickname={setEditNickname}
        />
      ) : (
        <InfoBox>
          <NickName>{editNickname}</NickName>
          <Email>{email}</Email>
          <Level>
            Lv. <Coloring>{LEVEL_LIST[level].level}</Coloring>
          </Level>
          <div>
            <Button onClick={handleClick}>회원정보 수정</Button>
          </div>
        </InfoBox>
      )}
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

export default Profile;
