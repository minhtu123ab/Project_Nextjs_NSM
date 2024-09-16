"use client";

import useNavigateAction from "@/hooks/useNavigateAction";
import { Button } from "@mui/material";
import React from "react";

const ButtonCreate = () => {
  const { navigateCreate } = useNavigateAction("formActions/create");

  return (
    <Button
      onClick={navigateCreate}
      variant="contained"
      className="text-white normal-case px-4"
    >
      Create Category
    </Button>
  );
};

export default ButtonCreate;
