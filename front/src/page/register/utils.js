const emailValidation = (email) => {
  return email
    .toLowerCase()
    .match(
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    );
};

const passwordValidation = (password) => {
  return password
    .toLowerCase()
    .match(
      /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[`~!@#$%^&*()\-_=+[\]{};':",.<>/?|])[a-zA-Z0-9`~!@#$%^&*()\-_=+[\]{};':",.<>/?|]{8,}$/,
    );
};

const registerValidation = (data) => {
  const { email, password, passwordConfirm, nickname } = data;

  const isEmailValid = emailValidation(email);
  const isPasswordValid = passwordValidation(password);
  const isPasswordSame = password === passwordConfirm;
  const isNicknameValid = nickname.length >= 2;

  return {
    isEmailValid,
    isPasswordValid,
    isPasswordSame,
    isNicknameValid,
  };
};

export default registerValidation;
