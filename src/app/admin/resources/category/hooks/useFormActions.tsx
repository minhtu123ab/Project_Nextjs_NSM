import axiosInstance from "@/axios/axiosInstance";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";

type actionType = "Create" | "Update";

const useFormActions = (actionType?: actionType, id?: string) => {
  const router = useRouter();

  const query = useSearchParams().toString();

  const onClickBack = () => {
    router.push(`/admin/resources/category?${query}`);
  };

  const onSubmit = async (data: IDataSubmitCategory) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("price_type", data.price_type);
      Array.isArray(data.image) && formData.append("image", data.image[0]);

      actionType === "Update"
        ? await axiosInstance.put(`/material_categories/${id}`, formData)
        : await axiosInstance.post("/material_categories", formData);
      toast.success(actionType + " successfully");
      router.push(
        `/admin/resources/category?${actionType === "Update" ? query : ""}`
      );
    } catch (e) {
      console.error(e);
      toast.error(actionType + " failed");
    }
  };

  return { onClickBack, onSubmit };
};

export default useFormActions;
