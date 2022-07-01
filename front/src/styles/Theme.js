const colors = {
  black: "#333333",
  white: "#ffffff",
  gray01: "#f6f6f6",
  gray02: "#dedede",
  gray03: "#8F8F8F",
  gray04: "#e5e5f1",
  primary: "#ff881d",
  secondary: "#AAD8FE",
  orange: "#F4AA19",
  skyblue: "#E3F1FB",
  deepblue: "#6FB7F4",
};

const calcRem = (size) => `${size / 16}rem`;

const fontSizes = {
  xs: calcRem(12),
  small: calcRem(14),
  base: calcRem(16),
  lg: calcRem(18),
  xl: calcRem(20),
  xxl: calcRem(22),
  xxxl: calcRem(24),
  titleSize: calcRem(50),
  subtitleSize: calcRem(40),
};

const breakPoint = "(max-width: 550px)";

const theme = {
  colors,
  fontSizes,
  breakPoint,
};

export default theme;
