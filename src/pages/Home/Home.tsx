import React, { useState } from "react";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";

import { CategoryChip } from "@/components/CategoryChip";
import { useQuestionStore } from "@/stores/question-store/question-store-provider";
import { useCategoryStore } from "@/stores/category-store/category-store-provider";

import { QuestionItem } from "./components/QuestionItem";
import { AddQuestionDialog } from "@/components/AddUpdateQuestionDialog";

function Home() {
  const { items: questions, onAdd } = useQuestionStore((state) => state);
  const {
    items: categories,
    selectedTag,
    onSelectTag,
  } = useCategoryStore((state) => state);

  const [isAddQuestionDialogOpen, setIsAddQuestionDialogOpen] = useState(false);

  const categoryFilterHandler = (id: string) => {
    onSelectTag(id);
  };

  return (
    <Box>
      <Grid container my={4}>
        <Grid
          item
          display="flex"
          alignItems="center"
          justifyContent="flex-start"
          xs={6}
        >
          <Typography variant="h3">All Questions</Typography>
        </Grid>

        <Grid
          item
          display="flex"
          alignItems="center"
          justifyContent="flex-end"
          xs={6}
        >
          <Button
            variant="contained"
            onClick={() => setIsAddQuestionDialogOpen(true)}
          >
            Ask
          </Button>
        </Grid>
      </Grid>

      <Stack spacing={3}>
        <Stack direction="row" spacing={1}>
          {categories.map((item) => (
            <CategoryChip
              key={item.id}
              id={item.id}
              title={item.title}
              onClick={categoryFilterHandler}
            />
          ))}
        </Stack>

        <Stack spacing={2}>
          {questions
            .filter((item) =>
              item.tag.find((element: string) => element === selectedTag?.id)
            )
            .map((filteredItem) => (
              <QuestionItem key={filteredItem.id} {...filteredItem} />
            ))}
        </Stack>
      </Stack>

      <AddQuestionDialog
        isOpen={isAddQuestionDialogOpen}
        onClose={() => setIsAddQuestionDialogOpen(false)}
        onSubmit={onAdd}
        categories={categories}
      />
    </Box>
  );
}

export default Home;
