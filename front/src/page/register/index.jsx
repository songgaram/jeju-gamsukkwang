import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { post } from "lib/apiController";

const initInfo = {
  email: "",
  password: "",
  nickname: "",
};

/*
 TODO 마크업
 TODO 유효성 검사
 TODO 디바운스
 */

const Register = () => {
  const navigate = useNavigate();
  const [registerInfo, setRegisterInfo] = useState(initInfo);
  const { email, password, nickname } = registerInfo;

  const handleInputChange = (e) => {
    setRegisterInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    post("user/register", { email, password, nickname });
    setRegisterInfo(initInfo);
    navigate("/");
  };

  return (
    <div>
      <h1>회원가입 페이지</h1>
      <form>
        <input
          type="email"
          placeholder="Email"
          name="email"
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          placeholder="Nickname"
          name="nickname"
          onChange={handleInputChange}
          required
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          onChange={handleInputChange}
          required
        />
        <button type="submit" onClick={handleOnSubmit}>
          REGISTER
        </button>
      </form>
    </div>
  );
};

export default Register;
