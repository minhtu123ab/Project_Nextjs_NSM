"use client";
import { useSearchParams } from "next/navigation";

const useGetQueryParams = () => {
  const searchParams = useSearchParams();

  return {
    name: searchParams.get("name") || "",
    category: searchParams.get("category") || "",
    page: searchParams.get("page") || "",
  };
};

export default useGetQueryParams;
