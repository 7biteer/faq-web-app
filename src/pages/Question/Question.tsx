import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  Container,
  Grid,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { useParams } from "react-router-dom";
import ModeIcon from "@mui/icons-material/Mode";

import { useAuthStore } from "@/stores/auth-store/auth-store-provider";
import { useAnswerStore } from "@/stores/answer-store/answer-store-provider";
import { useCategoryStore } from "@/stores/category-store/category-store-provider";
import { useQuestionStore } from "@/stores/question-store/question-store-provider";
import { CategoryChip } from "@/components/CategoryChip";
import { AnswerItem } from "./components/AnswerItem";
import { AddUpdateAnswerDialog } from "@/components/AddUpdateAnswerDialog";
import AddUpdateQuestionDialog from "@/components/AddUpdateQuestionDialog/AddUpdateQuestionDialog";

function Question() {
  const { id } = useParams();
  const { getById } = useQuestionStore((state) => state);

  if (!id) {
    return null;
  }

  const question = getById(id);

  if (!question) {
    return null;
  }

  const [isAddAnswerDialogOpen, setIsAddAnswerDialogOpen] = useState(false);
  const [isUpdateQuestionDialogOpen, setIsUpdateQuestionDialogOpen] =
    useState(false);

  const { isLoggedIn, profile, getByUserId } = useAuthStore((state) => state);
  const { getByQuestionId } = useAnswerStore((state) => state);
  const { items: categories } = useCategoryStore((state) => state);

  const answers = getByQuestionId(id);
  const user = getByUserId(question.userId);
  const answerCount = answers.length;

  return (
    <Container maxWidth="xl">
      <Stack my={3} spacing={3}>
        <Card>
          <Grid container p={2}>
            <Grid item xs={11}>
              <Stack spacing={2}>
                <Stack spacing={1}>
                  <Stack
                    direction="row"
                    alignContent="center"
                    justifyContent="space-between"
                  >
                    <Typography variant="h6">{question.title}</Typography>

                    {profile?.id === question.userId && (
                      <Tooltip title="Modify" placement="top" arrow>
                        <IconButton
                          color="primary"
                          onClick={() => setIsUpdateQuestionDialogOpen(true)}
                        >
                          <ModeIcon />
                        </IconButton>
                      </Tooltip>
                    )}
                  </Stack>

                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Avatar
                      alt={user?.username}
                      src={user?.avatarUrl}
                      sx={{ width: 24, height: 24 }}
                    />

                    <Typography component="span" variant="body2">
                      {user?.username}
                    </Typography>
                  </Stack>
                </Stack>

                <Typography>{question.description}</Typography>

                <Stack direction="row" flexWrap="wrap" spacing={1}>
                  {categories
                    .filter((item) =>
                      question.tag.find((element) => element === item.id),
                    )
                    .map((item) => (
                      <CategoryChip
                        id={item.id}
                        title={item.title}
                        variant="filled"
                      />
                    ))}
                </Stack>
              </Stack>
            </Grid>

            <Grid
              item
              display="flex"
              flexDirection="column"
              alignItems="flex-end"
              justifyContent="flex-end"
              xs={12}
              sm={1}
            >
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
              >
                <Typography>{answerCount}</Typography>

                <Typography>answer</Typography>
              </Box>
            </Grid>
          </Grid>
        </Card>

        <Stack spacing={2}>
          {answers.map((answer) => (
            <AnswerItem key={answer.id} {...answer} />
          ))}
        </Stack>

        {isLoggedIn && (
          <Box
            width="100%"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Button
              onClick={() => setIsAddAnswerDialogOpen(true)}
              variant="contained"
            >
              Add answer
            </Button>
          </Box>
        )}
      </Stack>

      <AddUpdateAnswerDialog
        isOpen={isAddAnswerDialogOpen}
        questionId={id}
        onClose={() => setIsAddAnswerDialogOpen(false)}
      />

      <AddUpdateQuestionDialog
        isOpen={isUpdateQuestionDialogOpen}
        questionId={id}
        onClose={() => setIsUpdateQuestionDialogOpen(false)}
      />
    </Container>
  );
}

export default Question;
