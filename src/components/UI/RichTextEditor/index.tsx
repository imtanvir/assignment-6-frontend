"use client";
import { Controller, useFormContext } from "react-hook-form";
import ReactQuill from "react-quill";

import "react-quill/dist/quill.snow.css";
import Styles from "./RichTextEditor.module.css";

interface RichTextEditorProps {
  name: string;
  label: string;
  placeholder?: string;
}

const RichTextEditor = ({
  name,
  label,
  placeholder = "Write something",
}: RichTextEditorProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="mb-4">
      <label
        className="block text-gray-700 dark:text-slate-50 mb-2"
        htmlFor={name}
      >
        Write your post
      </label>
      <Controller
        control={control}
        defaultValue=""
        name={name}
        render={({ field }) => (
          <ReactQuill
            {...field}
            className={`${Styles.customEditor} ${errors[name] ? "border-red-500" : ""} placeholder:dark:text-slate-50`}
            placeholder={placeholder}
            theme="snow"
            value={field.value || ""}
            onChange={field.onChange}
          />
        )}
      />
      {errors[name] && (
        <p className="text-red-500 mt-1">{errors[name].message as string}</p>
      )}
    </div>
  );
};

export default RichTextEditor;
