import React from "react";
import InputSearch from "@/components/InputSearch";
import TableCategory from "./TableCategory";
import ButtonCreate from "@/components/ButtonCreate";

const Category = () => {
  return (
    <div className="mt-5 flex flex-col gap-5 pb-10">
      <h1 className="text-3xl text-gray-500">Category</h1>
      <div className="flex justify-between">
        <InputSearch />
        <ButtonCreate name="Category" />
      </div>
      <TableCategory />
    </div>
  );
};

export default Category;
