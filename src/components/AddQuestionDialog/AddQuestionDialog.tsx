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
import { Question } from "@/interfaces/Question";
import { Category } from "@/interfaces/Category";

interface AddQuestionDialogProps {
  isOpen: boolean;
  categories: Category[];
  onClose: () => void;
  onSubmit: (question: Omit<Question, "id">) => void;
}

function AddQuestionDialog({
  isOpen,
  categories,
  onClose,
  onSubmit,
}: AddQuestionDialogProps) {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      aria-labelledby="add-question-dialog-title"
    >
      <DialogTitle id="add-question-dialog-title">{"Add Question"}</DialogTitle>
      <DialogContent>
        <Stack component="form" spacing={3}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="title"
            label="Title"
            name="text"
            autoComplete="title"
            autoFocus
            multiline
          />

          <Select variant="outlined">
            {categories.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                <ListItemText primary={item.title} />
              </MenuItem>
            ))}
          </Select>
          <TextField label="Description" multiline rows={7} />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="contained" onClick={() => onSubmit} autoFocus>
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddQuestionDialog;
