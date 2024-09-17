"use client";
import React from "react";
import schema from "@/app/admin/resources/material/schemaYup/schema";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useFormActions from "../../hooks/useFormActions";
import FormActionMaterialWithData from "../components/FormActionMaterial";

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
      part_number: "",
      name: "",
      image: [] || "",
      category: "",
      supplier: "",
      small_title: "",
      basic_price: 0,
      type: 0,
      large_title: "",
    },
  });

  const { onSubmit } = useFormActions("Create");

  return (
    <FormActionMaterialWithData
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
