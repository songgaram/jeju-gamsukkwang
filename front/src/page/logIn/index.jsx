import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import http from "libs/apiController";
import logInValidation from "./utils";
import { LOGIN_INIT_DATA, ERROR_MESSAGE } from "./constants";

import Input from "components/input";
import LogoIcon from "assets/images/LogoIcon.png";
import { LogInContainer, Title, LogInForm, InputBox } from "./logIn.style";

const LogIn = () => {
  const navigate = useNavigate();
  const [userInputData, setUserInputData] = useState(LOGIN_INIT_DATA);
  const { email, password } = userInputData;

  const { isEmailValid, isPasswordValid } = logInValidation(userInputData);

  const isInValid = {
    email: !isEmailValid && email.length > 0,
    password: !isPasswordValid && password.length > 0,
  };

  const isActive = isEmailValid && isPasswordValid;

  const handleOnChange = (e) => {
    setUserInputData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    try {
      http.post("user/register", { email, password });
      setUserInputData(LOGIN_INIT_DATA);
      navigate("/");
    } catch (error) {
      console.log("회원가입에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <LogInContainer>
      <img src={LogoIcon} alt="제주감수꽝 마스코트 이미지" />
      <Title>로그인</Title>
      <LogInForm>
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
        <button
          type="submit"
          onClick={handleOnSubmit}
          disabled={!isActive}
          active={isActive}
        >
          로그인
        </button>
        <span type="button" onClick={() => navigate("/register")}>
          제주감수꽝 회원 가입하기 〉
        </span>
      </LogInForm>
    </LogInContainer>
  );
};

export default LogIn;
