import React from "react";
import { UseFormSetValue, FieldValues, Path, PathValue } from "react-hook-form";

const useChangImage = <T extends FieldValues>(setValue: UseFormSetValue<T>) => {
  const [urlImage, setUrlImage] = React.useState<string | null>(null);

  const handleChangValueImage = (files: File[]) => {
    setValue("image" as Path<T>, files as PathValue<T, Path<T>>);
    setUrlImage(URL.createObjectURL(files[0]));
  };
  return { urlImage, handleChangValueImage, setUrlImage };
};

export default useChangImage;
