import React from "react";
import {BaseInput} from "./BaseInput";
import { ExpenseInputProps } from "../../types";

export const TextInput: React.FC<ExpenseInputProps> = ({
  label,
  value,
  name,
  onChange,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    onChange({
      value,
      name,
      label,
    });
  };

  return (
    <BaseInput
      label={label}
      value={value}
      onChange={handleChange}
      InputLabelProps={{
        shrink: true,
      }}
    />
  );
};

export default TextInput;
