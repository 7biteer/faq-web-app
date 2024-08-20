import React from "react";
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
  TextField,
} from "@mui/material";
import { CreateQuestion } from "@/interfaces/Question";
import { Category } from "@/interfaces/Category";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useAuthStore } from "@/stores/auth-store/auth-store-provider";
import { useNavigate } from "react-router-dom";

interface AddUpdateQuestionDialogProps {
  isOpen: boolean;
  categories: Category[];
  onClose: () => void;
  onSubmit: (question: CreateQuestion) => void;
}

function AddUpdateQuestionDialog({
  isOpen,
  categories,
  onClose,
  onSubmit,
}: AddUpdateQuestionDialogProps) {
  const { isLoggedIn, profile } = useAuthStore((state) => state);
  const navigate = useNavigate();

  const { control, handleSubmit, reset, trigger } = useForm<CreateQuestion>({});

  const submitHandler: SubmitHandler<CreateQuestion> = (data) => {
    if (isLoggedIn && profile) {
      onSubmit({ ...data, userId: profile.id });
      reset();
    }
  };

  const handleCancel = () => {
    reset();
    onClose();
  };

  const converterHandler = (selectedItems: string[]) => {
    return selectedItems.map(
      (select) => categories.find((item) => item.id === select)?.title
    );
  };

  if (!isLoggedIn) {
    navigate("/login");
  }

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      aria-labelledby="add-question-dialog-title"
      fullWidth
    >
      <DialogTitle id="add-question-dialog-title">Add Question</DialogTitle>

      <DialogContent>
        <Stack component="form" noValidate mt={2} spacing={3}>
          <Controller
            name="title"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                id="title"
                label="Title"
                required
                fullWidth
                autoComplete="title"
                autoFocus
                variant="outlined"
                error={!!fieldState.error}
                onChange={(event) => {
                  field.onChange(event);
                  if (fieldState.error) {
                    trigger(field.name);
                  }
                }}
              />
            )}
          />

          <Controller
            name="tag"
            control={control}
            defaultValue={[]}
            render={({ field, fieldState }) => (
              <Select
                {...field}
                multiple
                fullWidth
                label="Tags"
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

          <Controller
            name="description"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                id="description"
                label="Description"
                required
                fullWidth
                multiline
                rows={7}
                error={!!fieldState.error}
                onChange={(event) => {
                  field.onChange(event);
                  if (fieldState.error) {
                    trigger(field.name);
                  }
                }}
              />
            )}
          />
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button variant="outlined" onClick={handleCancel}>
          Cancel
        </Button>

        <Button
          variant="contained"
          autoFocus
          onClick={handleSubmit(submitHandler)}
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddUpdateQuestionDialog;
