"use client";

import { Button } from "@mui/material";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import React from "react";

const ButtonCreate = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const query = searchParams.toString();

  const onCLick = () => {
    router.push(`${pathname}/formActions/create?${query}`);
  };

  return (
    <Button
      onClick={onCLick}
      variant="contained"
      className="text-white normal-case px-4"
    >
      Create Category
    </Button>
  );
};

export default ButtonCreate;
