const INIT_USER_DATA = {
  email: "",
  password: "",
  passwordConfirm: "",
  nickname: "",
};

const ERROR_MESSAGE = {
  email: "이메일 형식이 올바르지 않습니다.",
  password: "비밀번호는 8자리 이상 영문 + 숫자 + 특수문자 조합입니다.",
  passwordConfirm: "비밀번호가 일치하지 않습니다.",
  nickname: "닉네임은 2글자 이상이어야 합니다.",
};

const MODAL_MESSAGE = "회원가입에 실패했습니다. 다시 시도해주세요.";

export { INIT_USER_DATA, ERROR_MESSAGE, MODAL_MESSAGE };
