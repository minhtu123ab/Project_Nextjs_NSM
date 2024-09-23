"use client";

import React, { Suspense, useEffect } from "react";
import schema from "@/app/admin/resources/material/_schemaYup/schema";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axiosInstance from "@/axios/axiosInstance";
import useChangImage from "@/hooks/useChangImage";
import FormActionMaterial from "../../_components/FormActionMaterial";
import { CircularProgress } from "@mui/material";

const Page = ({ params }: { params: { id: string } }) => {
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

  const { setUrlImage, urlImage } = useChangImage<ISetValueMaterial>(setValue);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`/material/${params.id}`);
        setValue("name", response.data.name);
        setValue("part_number", response.data.part_number);
        setValue("image", response.data.image);
        setValue("category", response.data.category);
        setValue("supplier", response.data.supplier);
        setValue("small_title", response.data.small_title);
        setValue("basic_price", response.data.basic_price);
        response.data.type
          ? setValue("type", response.data.type)
          : setValue("type", 0);
        setValue("large_title", response.data.large_title);
        setUrlImage(response.data.image);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, [params.id, setUrlImage, setValue]);

  return (
    <Suspense
      fallback={
        <div className="flex justify-center">
          <CircularProgress size={80} />
        </div>
      }
    >
      <FormActionMaterial
        setValue={setValue}
        control={control}
        errors={errors}
        handleSubmit={handleSubmit}
        action="Update"
        urlImageEdit={urlImage ?? undefined}
        id={params.id}
      />
    </Suspense>
  );
};

export default Page;
