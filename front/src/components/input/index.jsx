import React from "react";

import { StyledInput } from "./input.style";

const Input = ({ type, name, placeholder, onChange, autoComplete }) => {
  return (
    <StyledInput
      type={type}
      name={name}
      placeholder={placeholder}
      onChange={onChange}
      autoComplete={autoComplete}
    />
  );
};

export default Input;
