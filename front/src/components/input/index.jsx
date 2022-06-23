import React from "react";

import { StyledInput } from "./input.style";

const Input = ({ type, name, placeholder, onChange, autocomplete }) => {
  return (
    <StyledInput
      type={type}
      name={name}
      placeholder={placeholder}
      onChange={onChange}
      autocomplete={autocomplete}
    />
  );
};

export default Input;
