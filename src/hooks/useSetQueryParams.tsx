"use client";

import { useRouter } from "next/navigation";

const useSetQueryParams = () => {
  const router = useRouter();

  const setQueryParams = (name: string, value: string) => {
    const currentQueryParams = new URLSearchParams(window.location.search);

    currentQueryParams.set(name, value);
    if (!value) {
      currentQueryParams.delete(name);
    }

    router.push(`?${currentQueryParams.toString()}`, { scroll: false });
  };

  return setQueryParams;
};

export default useSetQueryParams;
