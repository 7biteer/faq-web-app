import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useAnswerStore } from "@/stores/answer-store/answer-store-provider";
import { useAuthStore } from "@/stores/auth-store/auth-store-provider";
import { CreateUpdateAnswer } from "@/interfaces/Answer";

interface AddUpdateAnswerDialogProps {
  isOpen: boolean;
  answerId?: string;
  questionId: string;
  onClose: () => void;
}

function AddUpdateAnswerDialog({
  isOpen,
  answerId,
  questionId,
  onClose,
}: AddUpdateAnswerDialogProps) {
  const { isLoggedIn, profile } = useAuthStore((state) => state);
  const { onAdd, onUpdate } = useAnswerStore((state) => state);

  const { control, handleSubmit, reset, trigger } = useForm<CreateUpdateAnswer>(
    {}
  );

  const onSubmit: SubmitHandler<CreateUpdateAnswer> = (data) => {
    if (isLoggedIn && profile) {
      if (answerId) {
        onUpdate(answerId, { ...data, questionId, userId: profile.id });
      } else {
        onAdd({ ...data, questionId, userId: profile.id });
      }
      reset();
    }
  };

  const handleCancel = () => {
    reset();
    onClose();
  };

  return (
    <Dialog
      open={isOpen}
      onClose={() => {}}
      aria-labelledby="add-update-answer-dialog-title"
      fullWidth
    >
      <DialogTitle id="add-update-answer-dialog-title">
        {answerId ? "Update" : "Add"} Answer
      </DialogTitle>

      <DialogContent>
        <Controller
          name="text"
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              id="text"
              label="Text"
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
      </DialogContent>

      <DialogActions>
        <Button variant="outlined" onClick={handleCancel}>
          Cancel
        </Button>

        <Button variant="contained" autoFocus onClick={handleSubmit(onSubmit)}>
          {answerId ? "Update" : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddUpdateAnswerDialog;
