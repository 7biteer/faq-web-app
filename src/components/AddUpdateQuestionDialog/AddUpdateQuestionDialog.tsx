import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  ListItemText,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import { CreateQuestion } from "@/interfaces/Question";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

import { useAuthStore } from "@/stores/auth-store/auth-store-provider";
import { useQuestionStore } from "@/stores/question-store/question-store-provider";
import { useCategoryStore } from "@/stores/category-store/category-store-provider";

import { TextFieldForm } from "../Form/TextFieldForm";

interface AddUpdateQuestionDialogProps {
  isOpen: boolean;
  questionId?: string;
  onClose: () => void;
}

function AddUpdateQuestionDialog({
  isOpen,
  questionId,
  onClose,
}: AddUpdateQuestionDialogProps) {
  const { isLoggedIn, profile } = useAuthStore((state) => state);
  const { getById, onAdd, onUpdate } = useQuestionStore((state) => state);
  const { items: categories } = useCategoryStore((state) => state);

  const question = questionId ? getById(questionId) : false;

  const { control, handleSubmit, reset } = useForm<CreateQuestion>({});

  const onSubmit: SubmitHandler<CreateQuestion> = (data) => {
    if (isLoggedIn && profile) {
      if (!questionId) {
        onAdd({ ...data, userId: profile.id });
      } else {
        onUpdate(questionId, { ...data, id: questionId, userId: profile.id });
      }

      handleCancel();
    }
  };

  const handleCancel = () => {
    reset();
    onClose();
  };

  const converterHandler = (selectedItems: string[]) => {
    return selectedItems.map(
      (select) => categories.find((item) => item.id === select)?.title,
    );
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      aria-labelledby="add-question-dialog-title"
      fullWidth
    >
      <DialogTitle id="add-question-dialog-title">
        {questionId ? "Update" : "Add"} Question
      </DialogTitle>

      <DialogContent>
        <Stack component="form" noValidate mt={2} spacing={3}>
          <TextFieldForm
            name="title"
            control={control}
            defaultValue={question ? question.title : ""}
            label="Title"
            required
          />

          <Controller
            name="tag"
            control={control}
            defaultValue={question ? question.tag : []}
            render={({ field, fieldState }) => (
              <Select
                {...field}
                multiple
                fullWidth
                error={!!fieldState.error}
                renderValue={(selected) =>
                  converterHandler(selected).join(", ")
                }
                variant="outlined"
              >
                {categories.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    <ListItemText primary={item.title} />
                  </MenuItem>
                ))}
              </Select>
            )}
          />

          <TextFieldForm
            name="description"
            control={control}
            defaultValue={question ? question.description : ""}
            label="Description"
            multiline
            rows={7}
            required
          />
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button variant="outlined" onClick={handleCancel}>
          Cancel
        </Button>

        <Button variant="contained" autoFocus onClick={handleSubmit(onSubmit)}>
          {questionId ? "Update" : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddUpdateQuestionDialog;
