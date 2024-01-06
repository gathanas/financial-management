import React from "react";
import { FieldInputProps } from "../../types";

export const BaseInput: React.FC<FieldInputProps> = ({
  darkMode = true,
  label = "",
  ...rest
}) => {

  return (
    <div className="base-input">
      <label>{label}</label>
      <input {...rest} />
    </div>
  );
};

export default BaseInput;
