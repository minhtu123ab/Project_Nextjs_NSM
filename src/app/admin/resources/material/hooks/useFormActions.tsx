import axiosInstance from "@/axios/axiosInstance";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

type actionType = "Create" | "Update";

const useFormActions = (actionType?: actionType, id?: string) => {
  const router = useRouter();

  const query = useSearchParams().toString();

  const onClickBack = () => {
    router.push(`/admin/resources/material?${query}`);
  };

  const onSubmit = async (data: IDataSubmitMaterial) => {
    try {
      const formData = new FormData();
      data.name
        ? formData.append("name", data.name)
        : formData.append("name", "");
      formData.append("part_number", data.part_number);
      formData.append("category", data.category);
      formData.append("supplier", data.supplier);
      formData.append("small_title", data.small_title);
      formData.append("basic_price", data.basic_price.toString());
      data.type
        ? formData.append("type", data.type.toString())
        : formData.append("type", "");
      formData.append("large_title", data.large_title);
      Array.isArray(data.image) && formData.append("image", data.image[0]);

      actionType === "Update"
        ? await axiosInstance.put(`/material/${id}`, formData)
        : await axiosInstance.post("/material", formData);
      toast.success(actionType + " successfully");
      router.push(
        `/admin/resources/material?${actionType === "Update" ? query : ""}`
      );
    } catch (e) {
      if (e instanceof AxiosError) {
        console.error(e);
        if (
          e.response?.status === 400 &&
          e.response?.data?.part_number?.length
        ) {
          toast.error("Part Number already exists");
        } else {
          toast.error(actionType + " failed");
        }
      } else {
        console.error(e);
        toast.error(actionType + " failed");
      }
    }
  };

  return { onClickBack, onSubmit };
};

export default useFormActions;
