import React from "react";
import { TextField, TextFieldProps } from "@mui/material";
import {
  Control,
  Controller,
  FieldValues,
  Path,
  PathValue,
} from "react-hook-form";

type TextFieldFormProps<T extends FieldValues = FieldValues> = Omit<
  TextFieldProps,
  "name"
> & {
  name: Path<T>;
  control?: Control<T>;
  readOnly?: boolean;
  defaultValue?: PathValue<T, Path<T>>;
  noErrorMsg?: boolean;
};

function TextFieldForm<TFieldValues extends FieldValues = FieldValues>({
  name,
  control,
  readOnly,
  defaultValue,
  noErrorMsg,
  ...rest
}: TextFieldFormProps<TFieldValues>) {
  const inputFielProps = {
    fullWidth: rest.fullWidth ?? true,
    margin: rest.margin ?? "dense",
    size: rest.size ?? "small",
    inputProps: {
      ...rest.inputProps,
      readOnly: readOnly,
    },
  };

  if (!control) {
    return <TextField {...rest} {...inputFielProps} />;
  }

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={
        defaultValue || ("" as PathValue<TFieldValues, Path<TFieldValues>>)
      }
      render={({ field, fieldState }) => (
        <TextField
          {...field}
          {...rest}
          {...inputFielProps}
          error={!noErrorMsg && !!fieldState.error}
          helperText={
            !noErrorMsg && !!fieldState.error
              ? fieldState.error?.type
              : rest.helperText
          }
        />
      )}
    />
  );
}

export default TextFieldForm;
