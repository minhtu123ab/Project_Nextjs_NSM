import React, { Suspense } from "react";
import ButtonCreate from "@/components/ButtonCreate";
import TableMaterial from "./_components/TableMaterial";
import InputSearchMaterial from "./_components/InputSearchMaterial";
import { CircularProgress } from "@mui/material";

const Material = () => {
  return (
    <div className="mt-5 flex flex-col gap-5 pb-10">
      <h1 className="text-3xl text-gray-500">Material</h1>
      <Suspense
        fallback={
          <div className="flex justify-center">
            <CircularProgress size={80} />
          </div>
        }
      >
        <div className="flex justify-between">
          <InputSearchMaterial />
          <ButtonCreate name="Material" />
        </div>
        <TableMaterial />
      </Suspense>
    </div>
  );
};

export default Material;
