"use client";
import React, { Suspense } from "react";
import schema from "@/app/admin/resources/material/_schemaYup/schema";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormActionMaterialWithData from "../_components/FormActionMaterial";
import { CircularProgress } from "@mui/material";

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
      image: [].length > 0 ? [] : "",
      category: "",
      supplier: "",
      small_title: "",
      basic_price: 0,
      type: 0,
      large_title: "",
    },
  });

  return (
    <Suspense
      fallback={
        <div className="flex justify-center">
          <CircularProgress size={80} />
        </div>
      }
    >
      <FormActionMaterialWithData
        setValue={setValue}
        control={control}
        errors={errors}
        handleSubmit={handleSubmit}
        action="Create"
      />
    </Suspense>
  );
};

export default Page;
