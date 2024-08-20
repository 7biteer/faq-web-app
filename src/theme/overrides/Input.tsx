import { Theme } from "@mui/material";

export default function Input(theme: Theme) {
  return {
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          borderColor: theme.palette.grey[600],
        },
      },
    },
  };
}
