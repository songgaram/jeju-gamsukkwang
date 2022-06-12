import React from "react";

import { StyledInput } from "./input.style";

const Input = ({ type, name, placeholder, onChange }) => {
  return (
    <StyledInput
      type={type}
      name={name}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
};

export default Input;
