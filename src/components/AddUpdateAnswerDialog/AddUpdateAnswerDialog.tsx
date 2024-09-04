import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
} from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { useAnswerStore } from "@/stores/answer-store/answer-store-provider";
import { useAuthStore } from "@/stores/auth-store/auth-store-provider";
import { CreateUpdateAnswer } from "@/interfaces/Answer";
import { TextFieldForm } from "../Form/TextFieldForm";

const schema = yup.object().shape({
  text: yup
    .string()
    .required("Description is required")
    .min(10, "Description must be at least 10 characters long"),
});

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
  const { getById, onAdd, onUpdate } = useAnswerStore((state) => state);

  const answer = answerId ? getById(answerId) : false;

  const { control, handleSubmit, reset } = useForm<
    Omit<CreateUpdateAnswer, "userId" | "questionId">
  >({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<
    Omit<CreateUpdateAnswer, "userId" | "questionId">
  > = (data) => {
    if (isLoggedIn && profile) {
      if (answerId) {
        onUpdate(answerId, { ...data, questionId, userId: profile.id });
      } else {
        onAdd({ ...data, questionId, userId: profile.id });
      }
      handleCancel();
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
        <Stack component="form" noValidate mt={2}>
          <TextFieldForm
            name="text"
            control={control}
            label="Text"
            defaultValue={answer ? answer.text : ""}
            required
            multiline
            rows={7}
          />
        </Stack>
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
