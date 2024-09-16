import React from "react";
import { UseFormSetValue, FieldValues } from "react-hook-form";

const useChangImage = (setValue: UseFormSetValue<FieldValues>) => {
  const [urlImage, setUrlImage] = React.useState<string | null>(null);

  const handleChangValueImage = (files: File[]) => {
    setValue("image", files);
    setUrlImage(URL.createObjectURL(files[0]));
  };
  return { urlImage, handleChangValueImage };
};

export default useChangImage;
