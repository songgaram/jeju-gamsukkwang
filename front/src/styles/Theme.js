const colors = {
  black: "#333333",
  white: "#ffffff",
  gray01: "#f6f6f6",
  gray02: "#dedede",
  gray03: "#8F8F8F",
  primary: "#ff881d",
  secondary: "#b5d3ec",
  orange: "#F4AA19",
  skyblue: "#E3F1FB",
};

const calcRem = (size) => `${size / 16}rem`;

const fontSizes = {
  small: calcRem(14),
  base: calcRem(16),
  lg: calcRem(18),
  xl: calcRem(20),
  xxl: calcRem(22),
  xxxl: calcRem(24),
  titleSize: calcRem(50),
  subtitleSize: calcRem(40),
};

const theme = {
  colors,
  fontSizes,
};

export default theme;
