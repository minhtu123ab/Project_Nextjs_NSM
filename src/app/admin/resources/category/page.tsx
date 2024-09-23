import React, { Suspense } from "react";

import TableCategory from "./_components/TableCategory";
import ButtonCreate from "@/components/ButtonCreate";
import InputSearchCategory from "./_components/InputSearchCategory";
import { CircularProgress } from "@mui/material";

const Category = () => {
  return (
    <div className="mt-5 flex flex-col gap-5 pb-10">
      <h1 className="text-3xl text-gray-500">Category</h1>
      <Suspense
        fallback={
          <div className="flex justify-center">
            <CircularProgress size={80} />
          </div>
        }
      >
        <div className="flex justify-between">
          <InputSearchCategory />
          <ButtonCreate name="Category" />
        </div>
        <TableCategory />
      </Suspense>
    </div>
  );
};

export default Category;
