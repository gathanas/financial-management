import React from "react";
import { BaseInput } from "./BaseInput";
import { ExpenseInputProps } from "../../types";

interface DateInputProps extends ExpenseInputProps<Date | null> {
}

export const DateInput: React.FC<DateInputProps> = ({
  label,
  value,
  name,
  onChange,
  defaultValue,
  ...props
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = event.target.value;
    onChange({
      value: selectedDate ? new Date(selectedDate) : null,
      name,
      label,
    });
  };

  return (
    <BaseInput
      {...props}
      label={label}
      type="date"
      max={new Date().toISOString().split("T")[0]}
      value={value ? value.toISOString().split("T")[0] : ""}
      onChange={handleChange}
    />
  );
};

export default DateInput;
