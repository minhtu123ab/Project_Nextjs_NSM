"use client";
import React from "react";
import schema from "@/app/admin/resources/category/_schemaYup/schema";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useFormActions from "../../_hooks/useFormActions";
import FormActionCategory from "../_components/FormActionCategory";

const Page = () => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onTouched",
    defaultValues: {
      price_type: "",
      name: "",
      image: [].length > 0 ? [] : "",
    },
  });

  const { onSubmit } = useFormActions("Create");

  return (
    <FormActionCategory
      onSubmit={onSubmit}
      setValue={setValue}
      control={control}
      errors={errors}
      handleSubmit={handleSubmit}
      action="Create"
    />
  );
};

export default Page;
