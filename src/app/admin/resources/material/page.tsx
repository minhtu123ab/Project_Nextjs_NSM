import React from "react";
// import InputSearch from "@/components/InputSearch";
import ButtonCreate from "@/components/ButtonCreate";
import TableMaterial from "./TableMaterial";
import InputSearchMaterial from "@/components/InputSearchMaterial";

const Material = () => {
  return (
    <div className="mt-5 flex flex-col gap-5 pb-10">
      <h1 className="text-3xl text-gray-500">Material</h1>
      <div className="flex justify-between">
        <InputSearchMaterial />
        <ButtonCreate name="Material" />
      </div>
      <TableMaterial />
    </div>
  );
};

export default Material;
