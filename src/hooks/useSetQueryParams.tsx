"use client";

import { useRouter } from "next/navigation";

const useSetQueryParams = () => {
  const router = useRouter();

  const setQueryParams = (params: Record<string, string>) => {
    const currentQueryParams = new URLSearchParams(window.location.search);

    Object.entries(params).forEach(([name, value]) => {
      if (value) {
        currentQueryParams.set(name, value);
      } else {
        currentQueryParams.delete(name);
      }
    });

    router.push(`?${currentQueryParams.toString()}`, { scroll: false });
  };

  return setQueryParams;
};

export default useSetQueryParams;
