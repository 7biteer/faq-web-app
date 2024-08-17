import React from "react";
import { Card } from "@mui/material";
import { useParams } from "react-router-dom";

function Question() {
  const { id } = useParams();

  return <Card></Card>;
}

export default Question;
