"use client";
import React from "react";
import schema from "@/app/admin/resources/category/schemaYup/schema";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useFormActions from "../../hooks/useFormActions";
import FormActionCategory from "../components/FormActionCategory";

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
      image: [] || "",
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
