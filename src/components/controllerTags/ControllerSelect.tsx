import { MenuItem, Select } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";

const ControllerSelect: React.FC<IPropControllerSelect> = ({
  control,
  errors,
  name,
  label,
  required,
  type,
  data,
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
            <Select
              type={type}
              id={name}
              size="small"
              {...field}
              placeholder={label}
            >
              {data.map((item, index) => (
                <MenuItem value={item.value} key={index}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          )}
        />
        {errors.price_type && (
          <span className="text-red-500">{errors[name].message}</span>
        )}
      </div>
    </div>
  );
};

export default ControllerSelect;
