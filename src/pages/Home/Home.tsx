import { useState } from "react";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { CategoryChip } from "@/components/CategoryChip";
import { AddQuestionDialog } from "@/components/AddUpdateQuestionDialog";
import { useQuestionStore } from "@/stores/question-store/question-store-provider";
import { useCategoryStore } from "@/stores/category-store/category-store-provider";
import { useAuthStore } from "@/stores/auth-store/auth-store-provider";

import { QuestionItem } from "./components/QuestionItem";

function Home() {
  const navigate = useNavigate();

  const { isLoggedIn } = useAuthStore((state) => state);
  const { items: questions } = useQuestionStore((state) => state);
  const {
    items: categories,
    selectedTag,
    onSelectTag,
  } = useCategoryStore((state) => state);

  const [isAddQuestionDialogOpen, setIsAddQuestionDialogOpen] = useState(false);

  const categoryFilterHandler = (id: string) => {
    onSelectTag(id);
  };

  const handleAskAction = () => {
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      setIsAddQuestionDialogOpen(true);
    }
  };

  return (
    <Box>
      <Grid container my={4} px={1}>
        <Grid
          item
          display="flex"
          alignItems="center"
          justifyContent="flex-start"
          xs={12}
          sm={6}
        >
          <Typography variant="h3">Questions</Typography>
        </Grid>

        <Grid
          item
          display="flex"
          alignItems="center"
          justifyContent="flex-end"
          xs={12}
          sm={6}
        >
          <Button variant="contained" onClick={handleAskAction}>
            Ask
          </Button>
        </Grid>
      </Grid>

      <Stack spacing={3}>
        <Grid container spacing={1}>
          {categories.map((item) => (
            <Grid key={item.id} item>
              <CategoryChip
                id={item.id}
                title={item.title}
                onClick={categoryFilterHandler}
              />
            </Grid>
          ))}
        </Grid>

        <Stack spacing={2}>
          {questions
            .filter((item) =>
              item.tag.find((element: string) => element === selectedTag?.id),
            )
            .map((filteredItem) => (
              <QuestionItem key={filteredItem.id} {...filteredItem} />
            ))}
        </Stack>
      </Stack>

      <AddQuestionDialog
        isOpen={isAddQuestionDialogOpen}
        onClose={() => setIsAddQuestionDialogOpen(false)}
      />
    </Box>
  );
}

export default Home;
