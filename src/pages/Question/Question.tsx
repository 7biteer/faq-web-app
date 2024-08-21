import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { useParams } from "react-router-dom";

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

  const { getByUserId } = useAuthStore((state) => state);
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
            <Grid
              item
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              xs={1}
            >
              <Typography>{answerCount}</Typography>

              <Typography>answer</Typography>
            </Grid>

            <Grid item xs={11}>
              <Stack spacing={2}>
                <Stack spacing={1}>
                  <Typography variant="h6">{question.title}</Typography>

                  <Typography component="span" variant="body2">
                    {user?.username}
                  </Typography>
                </Stack>

                <Typography>{question.description}</Typography>

                <Stack direction="row" spacing={1}>
                  {categories
                    .filter((item) =>
                      question.tag.find((element) => element === item.id)
                    )
                    .map((item) => (
                      <CategoryChip
                        key={item.id}
                        id={item.id}
                        title={item.title}
                        variant="filled"
                      />
                    ))}
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </Card>

        <Stack spacing={2}>
          {answers.map((answer) => (
            <AnswerItem key={answer.id} {...answer} />
          ))}
        </Stack>

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
      </Stack>

      <AddUpdateAnswerDialog
        isOpen={isAddAnswerDialogOpen}
        questionId={id}
        onClose={() => setIsAddAnswerDialogOpen(false)}
      />

      <AddUpdateQuestionDialog
        isOpen={false}
        onClose={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
    </Container>
  );
}

export default Question;
