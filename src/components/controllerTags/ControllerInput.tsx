import { TextField } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";

const ControllerInput: React.FC<IPropControllerInput> = ({
  control,
  errors,
  name,
  label,
  required,
  type,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name}>
        {label}
        {required && <span className="text-red-500"> *</span>}:
      </label>
      <div className="flex flex-col">
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <TextField
              type={type}
              size="small"
              id={name}
              {...field}
              placeholder={label}
            />
          )}
        />
        {errors[name] && (
          <span className="text-red-500">{errors[name].message}</span>
        )}
      </div>
    </div>
  );
};

export default ControllerInput;
