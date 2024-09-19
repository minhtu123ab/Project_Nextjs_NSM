"use client";

import { useSearchParams } from "next/navigation";

const useGetQueryParams = () => {
  const query = useSearchParams();

  return {
    name: query.get("name") || "",
    category: query.get("category") || "",
    page: query.get("page") || "",
  };
};

export default useGetQueryParams;
