"use client";

import React, { Suspense } from "react";
import schema from "@/app/admin/resources/category/_schemaYup/schema";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormActionCategory from "../_components/FormActionCategory";
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
      price_type: "",
      name: "",
      image: [].length > 0 ? [] : "",
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
      <FormActionCategory
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
