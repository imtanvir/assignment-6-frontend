import { Select, SelectItem } from "@nextui-org/select";
import { useFormContext } from "react-hook-form";

import { IInput } from "./FXInput";

interface IProps extends IInput {
  options: {
    key: string | boolean;
    label: string;
  }[];
}

const FXSelect = ({ options, name, label, variant = "bordered" }: IProps) => {
  const { register } = useFormContext();

  return (
    <Select
      {...register(name)}
      className="min-w-full sm:min-w-[225px]"
      label={label}
      variant={variant}
    >
      {options.map((option) => (
        <SelectItem key={option.label}>{option.label}</SelectItem>
      ))}
    </Select>
  );
};

export default FXSelect;
