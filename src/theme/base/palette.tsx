const BLACK = "#000A0F";

const WHITE = "#F2F9FB";

const PRIMARY = {
  light: "#00E242",
  main: "#00C56D",
  dark: "#005845",
  contrastText: BLACK,
};

const SECONDARY = {
  lighter: "#00FFF2",
  light: "#00DBF5",
  main: "#00AEEB",
  dark: "#0063B0",
  darker: "#002D75",
  contrastText: WHITE,
};

const ERROR = {
  lighter: "#FF0004",
  light: "#F60037",
  main: "#EC0065",
  dark: "#8E0020",
  darker: "#5F000B",
  contrastText: WHITE,
};

const WARNING = {
  lighter: "#FFF7CD",
  light: "#FFE100",
  main: "#FFC107",
  dark: "#D0AE00",
  darker: "#A28000",
};

const INFO = {
  lighter: "#D0F2FF",
  light: "#74CAFF",
  main: "#1890FF",
  dark: "#0C53B7",
  darker: "#04297A",
  contrastText: WHITE,
};

const SUCCESS = {
  light: "#AAF27F",
  main: "#00E49B",
};

const COMMON = {
  common: { black: BLACK, white: WHITE },
  primary: { ...PRIMARY },
  secondary: { ...SECONDARY },
  info: { ...INFO },
  success: { ...SUCCESS },
  warning: { ...WARNING },
  error: { ...ERROR },
};

const darkPalette = {
  mode: "dark",
  ...COMMON,
};

const palette = {
  light: {
    ...COMMON,
  },
  dark: darkPalette,
};

export default palette;
