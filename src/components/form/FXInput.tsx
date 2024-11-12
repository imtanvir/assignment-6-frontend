"use client";
import { Input } from "@nextui-org/input";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

export interface IInput {
  variant?: "flat" | "bordered" | "faded" | "underlined";
  size?: "sm" | "md" | "lg";
  required?: boolean;
  type?: string;
  label: string;
  name: string;
  value?: string;
  className?: string;
  placeholder?: string;
  disable?: boolean;
}

const FXInput = ({
  variant = "bordered",
  size = "md",
  required = false,
  type = "text",
  label,
  name,
  value = "",
  className = "",
  placeholder,
  disable = false,
}: IInput) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const [inputValue, setInputValue] = useState(value || "");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <Input
      {...register(name)}
      className={className}
      disabled={disable}
      errorMessage={errors[name] ? (errors[name].message as string) : ""}
      isInvalid={!!errors[name]}
      label={label}
      placeholder={placeholder}
      required={required}
      size={size}
      type={type}
      value={inputValue}
      variant={variant}
      onChange={(e) => {
        handleChange(e);
      }}
    />
  );
};

export default FXInput;
