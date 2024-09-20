"use client";

import React, { useEffect } from "react";
import schema from "@/app/admin/resources/material/_schemaYup/schema";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axiosInstance from "@/axios/axiosInstance";
import useFormActions from "../../../_hooks/useFormActions";
import useChangImage from "@/hooks/useChangImage";
import FormActionMaterial from "../../_components/FormActionMaterial";

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

  const { onSubmit } = useFormActions("Update", params.id);

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
    <FormActionMaterial
      onSubmit={onSubmit}
      setValue={setValue}
      control={control}
      errors={errors}
      handleSubmit={handleSubmit}
      action="Update"
      urlImageEdit={urlImage ?? undefined}
    />
  );
};

export default Page;
