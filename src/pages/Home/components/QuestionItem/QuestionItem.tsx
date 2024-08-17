import React from "react";
import { Card, Grid, Link, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { CategoryChip } from "@/components/CategoryChip";
import { useAuthStore } from "@/stores/auth-store/auth-store-provider";
import { useAnswerStore } from "@/stores/answer-store/answer-store-provider";
import { useCategoryStore } from "@/stores/category-store/category-store-provider";

interface QuestionItemProps {
  id: string;
  title: string;
  description: string;
  userId: string;
  tag: string[];
}

function QuestionItem({
  id,
  title,
  description,
  userId,
  tag,
}: QuestionItemProps) {
  const navigation = useNavigate();

  const { getByUserId } = useAuthStore((state) => state);
  const { getByQuestionId } = useAnswerStore((state) => state);
  const { items: categories } = useCategoryStore((state) => state);

  const user = getByUserId(userId);
  const answerCount = getByQuestionId(id).length;

  return (
    <Card onClick={() => navigation(`/${id}`)} sx={{ cursor: "pointer" }}>
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
              <Link href={`/${id}`} variant="h6">
                {title}
              </Link>

              <Typography component="span" variant="body2">
                {user?.username}
              </Typography>
            </Stack>

            <Typography>{description}</Typography>

            <Stack direction="row" spacing={1}>
              {categories
                .filter((item) => tag?.find((element) => element === item.id))
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
  );
}

export default QuestionItem;
