"use client";

import useNavigateAction from "@/hooks/useNavigateAction";
import { Button } from "@mui/material";
import React from "react";

const ButtonCreate = ({ name }: { name: string }) => {
  const { navigateCreate } = useNavigateAction(`formActions/create`);

  return (
    <Button
      onClick={navigateCreate}
      variant="contained"
      sx={{
        color: "white",
        textTransform: "none",
        padding: "0rem 1rem",
      }}
    >
      Create {name}
    </Button>
  );
};

export default ButtonCreate;
