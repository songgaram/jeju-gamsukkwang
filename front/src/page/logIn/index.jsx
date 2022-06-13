import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import http from "libs/apiController";
import logInValidation from "./utils";
import { LOGIN_INIT_DATA, ERROR_MESSAGE } from "./constants";

import Input from "components/input";
import LogoIcon from "assets/images/LogoIcon.png";
import {
  LogInContainer,
  Title,
  LogInForm,
  InputBox,
  LoginButton,
} from "./logIn.style";

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

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await http.post("user/login", {
        email,
        password,
      });
      localStorage.setItem("accessToken", res.data.token);
      navigate("/");
    } catch (err) {
      console.log("로그인에 실패하였습니다.\n", err);
      alert(
        "🤯 로그인에 실패하였습니다 🤯 \n 아이디와 비밀번호를 확인해주세요!",
      );
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
        <LoginButton
          type="submit"
          onClick={handleOnSubmit}
          disabled={!isActive}
          isActive={isActive}
        >
          로그인
        </LoginButton>
        <span type="button" onClick={() => navigate("/register")}>
          제주감수꽝 회원 가입하기 〉
        </span>
      </LogInForm>
    </LogInContainer>
  );
};

export default LogIn;
