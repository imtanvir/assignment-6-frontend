"use client";
import { Textarea } from "@nextui-org/input";
import { useFormContext, useWatch } from "react-hook-form";

import { IInput } from "./FXInput";

export interface ITextArea extends IInput {
  type?: string;
}

const FXTextArea = ({ name, label, variant = "bordered" }: ITextArea) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const value = useWatch({ name });

  return (
    <>
      <Textarea
        {...register(name)}
        label={label}
        minRows={5}
        placeholder="Write your feedback here..."
        value={value || ""}
        variant={variant}
      />
    </>
  );
};

export default FXTextArea;
