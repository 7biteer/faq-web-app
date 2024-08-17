import React from "react";
import { Chip } from "@mui/material";

interface CategoryChipProps {
  id: string;
  title: string;
  variant?: "outlined" | "filled";
  onClick?: (id: string) => void;
}

function CategoryChip({
  id,
  title,
  variant = "outlined",
  onClick,
}: CategoryChipProps) {
  return (
    <Chip
      label={title}
      variant={variant}
      onClick={() => onClick && onClick(id)}
    />
  );
}

export default CategoryChip;
