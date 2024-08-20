import React, { useState } from "react";
import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import ModeIcon from "@mui/icons-material/Mode";
import BackspaceIcon from "@mui/icons-material/Backspace";

import { Answer } from "@/interfaces/Answer";
import { useAuthStore } from "@/stores/auth-store/auth-store-provider";
import { useAnswerStore } from "@/stores/answer-store/answer-store-provider";
import { AddUpdateAnswerDialog } from "@/components/AddUpdateAnswerDialog";

function AnswerItem({
  id,
  userId,
  questionId,
  text,
  likeCount,
  dislikeCount,
}: Answer) {
  const { isLoggedIn, profile, getByUserId } = useAuthStore((state) => state);
  const { onRemove } = useAnswerStore((state) => state);

  const [isUpdateAnswerDialogOpen, setIsUpdateAnswerDialogOpen] =
    useState(false);

  const ActionsComponents = () => {
    if (!isLoggedIn && profile?.id !== userId) {
      return null;
    }

    return (
      <Stack direction="row" spacing={2}>
        <IconButton
          color="primary"
          onClick={() => setIsUpdateAnswerDialogOpen(true)}
        >
          <ModeIcon />
        </IconButton>

        <IconButton color="primary" onClick={() => onRemove(id)}>
          <BackspaceIcon />
        </IconButton>
      </Stack>
    );
  };

  return (
    <>
      <Card>
        <CardHeader
          title={getByUserId(userId)?.username}
          action={<ActionsComponents />}
        />

        <CardContent>
          <Typography>{text}</Typography>
        </CardContent>

        <CardActionArea>
          <Button endIcon={<ThumbUpIcon />}>{likeCount}</Button>
          <Button endIcon={<ThumbDownAltIcon />}>{dislikeCount}</Button>
        </CardActionArea>
      </Card>

      <AddUpdateAnswerDialog
        isOpen={isUpdateAnswerDialogOpen}
        answerId={id}
        questionId={questionId}
        onClose={() => setIsUpdateAnswerDialogOpen(false)}
      />
    </>
  );
}

export default AnswerItem;
