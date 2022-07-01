import { useState } from "react";
import { InfoBox, Email, Level, Coloring } from "./mypage.style";
import styled from "styled-components";
import Button from "components/button/Button";
import { LEVEL_LIST } from "./constants";
import { useChangeNickname } from "queries/userQuery";

const ProfileEditForm = ({ nickname, email, level, setEditing }) => {
  const [editNickname, setEditNickname] = useState(nickname);
  const changeNickname = useChangeNickname();
  const data = { nickname: editNickname };

  const handleSubmit = async (e) => {
    e.preventDefault();
    changeNickname.mutate(data);
    setEditing(false);
  };

  return (
    <InfoBox>
      <StyledInput
        name="nickname"
        type="text"
        value={editNickname}
        onChange={(e) => setEditNickname(e.target.value)}
      />
      <Email>{email}</Email>
      <Level>
        Lv. <Coloring>{LEVEL_LIST[level].level}</Coloring>
      </Level>
      <div>
        <Button onClick={() => setEditing(false)}>취소</Button>
        <Button type="submit" onClick={handleSubmit}>
          완료
        </Button>
      </div>
    </InfoBox>
  );
};

export default ProfileEditForm;

const StyledInput = styled.input`
  width: 90%;
  height: 35px;
  padding: 0 5%;
  letter-spacing: 0.5px;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.gray02};
  outline: none;
  font-size: ${({ theme }) => theme.fontSizes.xxl};

  &:focus {
    border: 1px solid ${({ theme }) => theme.colors.primary};
  }
`;
