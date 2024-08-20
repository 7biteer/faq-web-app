import { Theme } from "@mui/material";

export default function InputLabel(theme: Theme) {
  return {
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: theme.palette.grey[600],
        },
      },
    },
  };
}
