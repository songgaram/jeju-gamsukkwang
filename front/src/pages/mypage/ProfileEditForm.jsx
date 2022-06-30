import { InfoBox, Email, Level, Coloring } from "./mypage.style";
import styled from "styled-components";
import Button from "components/Button";
import { LEVEL_LIST } from "./constants";
import http from "libs/apiController";

const ProfileEditForm = ({
  email,
  level,
  setEditing,
  editNickname,
  setEditNickname,
}) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await http.put("user", {
        nickname: editNickname,
      });
      setEditNickname(editNickname);
      setEditing(false);
    } catch (err) {
      console.log("user nickname 수정 실패", err);
    }
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

export default ProfileEditForm;
