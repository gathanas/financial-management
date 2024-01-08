import React from "react";
import NumberInput from "./NumberInput";
import { ExpenseInputChangeProps, NumberInputProps } from "../../types";

const PriceInput: React.FC<NumberInputProps> = ({
  value,
  name,
  label,
  onChange,
  ...props
}) => {
  const handleInputChange: ExpenseInputChangeProps = ({
    name,
    label,
    value,
  }) => {
    onChange({ value: value * 100, name, label });
  };

  return (
    <NumberInput
      {...props}
      min={0.01}
      label={label}
      value={value / 100}
      onChange={handleInputChange}
      name={name}
    />
  );
};

export default PriceInput;
