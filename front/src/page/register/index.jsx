import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import http from "libs/apiController";
import registerValidation from "./utils";
import { INIT_USER_DATA, ERROR_MESSAGE } from "./constants";

import Input from "components/input";
import {
  RegisterContainer,
  Title,
  RegisterForm,
  InputBox,
} from "./register.style";

const Register = () => {
  const navigate = useNavigate();
  const [userInputData, setUserInputData] = useState(INIT_USER_DATA);
  const { email, password, passwordConfirm, nickname } = userInputData;

  const { isEmailValid, isPasswordValid, isPasswordSame, isNicknameValid } =
    registerValidation(userInputData);

  const isInValid = {
    email: !isEmailValid && email.length > 0,
    password: !isPasswordValid && password.length > 0,
    passwordConfirm: !isPasswordSame && passwordConfirm.length > 0,
    nickname: !isNicknameValid && nickname.length > 0,
  };

  const isActive =
    isEmailValid && isPasswordValid && isPasswordSame && isNicknameValid;

  const handleOnChange = (e) => {
    console.log(e.target.value);
    setUserInputData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  console.log(userInputData);

  const handleOnSubmit = (e) => {
    e.preventDefault();

    try {
      http.post("user/register", { email, password, nickname });
      setUserInputData(INIT_USER_DATA);
      navigate("/");
    } catch (error) {
      console.log("회원가입에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <RegisterContainer>
      <Title>회원가입</Title>
      <RegisterForm>
        <InputBox>
          <label htmlFor="email">이메일</label>
          <Input
            type="email"
            name="email"
            placeholder="이메일 주소를 입력해주세요."
            onChange={handleOnChange}
            required
          />
          {isInValid.email && <p>{ERROR_MESSAGE.email}</p>}
        </InputBox>
        <InputBox>
          <label htmlFor="password">비밀번호</label>
          <Input
            type="password"
            name="password"
            placeholder="비밀번호를 입력해주세요."
            onChange={handleOnChange}
            required
          />
          {isInValid.password && <p>{ERROR_MESSAGE.password}</p>}
        </InputBox>
        <InputBox>
          <label htmlFor="passwordConfirm">비밀번호 확인</label>
          <Input
            type="password"
            name="passwordConfirm"
            placeholder="비밀번호를 한번 더 입력해주세요."
            onChange={handleOnChange}
            required
          />
          {isInValid.passwordConfirm && <p>{ERROR_MESSAGE.passwordConfirm}</p>}
        </InputBox>
        <InputBox>
          <label htmlFor="nickname">닉네임</label>
          <Input
            type="text"
            name="nickname"
            placeholder="닉네임을 입력해주세요."
            onChange={handleOnChange}
            required
          />
          {isInValid.nickname && <p>{ERROR_MESSAGE.nickname}</p>}
        </InputBox>
        <button type="submit" onClick={handleOnSubmit} disabled={!isActive}>
          REGISTER
        </button>
      </RegisterForm>
    </RegisterContainer>
  );
};

export default Register;
