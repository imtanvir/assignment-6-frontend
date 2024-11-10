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
}

const FXInput = ({
  variant = "bordered",
  size = "md",
  required = false,
  type = "text",
  label,
  name,
  value,
  className = "",
  placeholder,
}: IInput) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const [inputValue, setInputValue] = useState(value || "");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  console.log({ errors });

  return (
    <Input
      {...register(name)}
      className={className}
      errorMessage={errors[name] ? (errors[name].message as string) : ""}
      isInvalid={!!errors[name]}
      label={label}
      placeholder={placeholder}
      required={required}
      size={size}
      type={type}
      // value={inputValue}
      variant={variant}
      onChange={(e) => {
        handleChange(e);
      }}
    />
  );
};

export default FXInput;
