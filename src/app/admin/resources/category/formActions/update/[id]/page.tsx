"use client";

import React, { useEffect } from "react";
import schema from "@/app/admin/resources/category/schemaYup/schema";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axiosInstance from "@/axios/axiosInstance";
import useFormActions from "../../../hooks/useFormActions";
import FormActionCategory from "../../components/FormActionCategory";
import useChangImage from "@/hooks/useChangImage";

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
      price_type: "",
      name: "",
      image: [] || "",
    },
  });

  const { onSubmit } = useFormActions("Update", params.id);

  const { setUrlImage, urlImage } =
    useChangImage<ISetValueFormCategory>(setValue);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(
          `/material_categories/${params.id}`
        );
        setValue("name", response.data.name);
        setValue("price_type", response.data.price_type);
        setValue("image", response.data.image);
        setUrlImage(response.data.image);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, [params.id, setUrlImage, setValue]);

  return (
    <FormActionCategory
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
