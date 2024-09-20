import React from "react";

import TableCategory from "./_components/TableCategory";
import ButtonCreate from "@/components/ButtonCreate";
import InputSearchCategory from "./_components/InputSearchCategory";

const Category = () => {
  return (
    <div className="mt-5 flex flex-col gap-5 pb-10">
      <h1 className="text-3xl text-gray-500">Category</h1>
      <div className="flex justify-between">
        <InputSearchCategory />
        <ButtonCreate name="Category" />
      </div>
      <TableCategory />
    </div>
  );
};

export default Category;
