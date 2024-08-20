import React from "react";
import { Link, Typography } from "@mui/material";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";

function Logo() {
  return (
    <Link href="/" display="flex" alignItems="center" gap={1}>
      <QuestionAnswerIcon />

      <Typography variant="h4">FAQ</Typography>
    </Link>
  );
}

export default Logo;
