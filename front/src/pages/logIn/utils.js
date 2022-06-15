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

const logInValidation = (data) => {
  const { email, password } = data;

  const isEmailValid = emailValidation(email);
  const isPasswordValid = passwordValidation(password);
  return {
    isEmailValid,
    isPasswordValid,
  };
};

export default logInValidation;
