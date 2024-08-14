import React from "react";
import { Chip } from "@mui/material";

interface CategoryChipProps {
  id: string;
  title: string;
  onClick: () => void;
  bg: string;
}

function CategoryChip({ title }: CategoryChipProps) {
  return <Chip label={title} variant="outlined" />;
}

export default CategoryChip;
