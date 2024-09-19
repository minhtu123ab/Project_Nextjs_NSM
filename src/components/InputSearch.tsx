"use client";

import { InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React, { useState } from "react";
import useSetQueryParams from "@/hooks/useSetQueryParams";
import useGetQueryParams from "@/hooks/useGetQueryParams";
import ClearSearch from "./ClearSearch";

const InputSearch = () => {
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
      <TextField
        type="search"
        autoComplete="off"
        placeholder="Search"
        size="small"
        sx={{
          "& .MuiInputBase-root": {
            height: "32px",
            width: "300px",
            borderRadius: 200,
            paddingLeft: 1,
          },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              border: "none",
            },
          },
        }}
        className="bg-white rounded-full h-8 shadow-md"
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          },
        }}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <ClearSearch clearStateSearch={clearStateSearch} />
    </form>
  );
};

export default InputSearch;
