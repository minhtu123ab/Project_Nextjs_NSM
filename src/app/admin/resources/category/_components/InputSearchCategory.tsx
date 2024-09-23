"use client";

import React, { useState } from "react";
import useSetQueryParams from "@/hooks/useSetQueryParams";
import useGetQueryParams from "@/hooks/useGetQueryParams";
import ClearSearch from "../../_components/ClearSearch";
import InputSearch from "@/components/InputSearch";

const InputSearchCategory = () => {
  const queryParams = useGetQueryParams();
  const [search, setSearch] = useState<string>(queryParams.name || "");
  const setQueryParams = useSetQueryParams();
  const onSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setQueryParams({
      name: search,
    });
  };
  const clearStateSearch = () => {
    setSearch("");
  };
  return (
    <form
      onSubmit={onSubmit}
      className="flex items-center justify-center gap-1"
    >
      <InputSearch search={search} setSearch={setSearch} />
      <ClearSearch clearStateSearch={clearStateSearch} />
    </form>
  );
};

export default InputSearchCategory;
