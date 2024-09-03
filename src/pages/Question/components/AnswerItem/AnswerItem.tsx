import { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Stack,
  Tooltip,
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
  const { onRemove, onLike, onDislike } = useAnswerStore((state) => state);

  const [isUpdateAnswerDialogOpen, setIsUpdateAnswerDialogOpen] =
    useState(false);

  const ActionsComponents = () => {
    if (isLoggedIn && profile && profile.id === userId) {
      return (
        <Stack direction="row" spacing={2}>
          <Tooltip title="Modify" placement="top" arrow>
            <IconButton
              color="primary"
              onClick={() => setIsUpdateAnswerDialogOpen(true)}
            >
              <ModeIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Delete" placement="top" arrow>
            <IconButton color="primary" onClick={() => onRemove(id)}>
              <BackspaceIcon />
            </IconButton>
          </Tooltip>
        </Stack>
      );
    }

    return null;
  };

  const user = getByUserId(userId);

  return (
    <>
      <Card>
        <CardHeader
          title={
            <Stack direction="row" alignItems="center" spacing={2}>
              <Avatar
                alt={user?.username}
                src={user?.avatarUrl}
                sx={{ width: 32, height: 32 }}
              />

              <Typography variant="h6">{user?.username}</Typography>
            </Stack>
          }
          action={<ActionsComponents />}
        />

        <CardContent>
          <Typography>{text}</Typography>
        </CardContent>

        <Box>
          <Tooltip title="Like" placement="top" arrow>
            <Button
              endIcon={<ThumbUpIcon />}
              onClick={() => isLoggedIn && onLike(id)}
            >
              {likeCount}
            </Button>
          </Tooltip>

          <Tooltip title="Dislike" placement="top" arrow>
            <Button
              endIcon={<ThumbDownAltIcon />}
              color="error"
              onClick={() => isLoggedIn && onDislike(id)}
            >
              {dislikeCount}
            </Button>
          </Tooltip>
        </Box>
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
