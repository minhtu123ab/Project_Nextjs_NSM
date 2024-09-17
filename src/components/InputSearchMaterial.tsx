"use client";

import { Button, InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React, { useState } from "react";
import useSetQueryParams from "@/hooks/useSetQueryParams";
import useGetQueryParams from "@/hooks/useGetQueryParams";
import SearchOffIcon from "@mui/icons-material/SearchOff";

const InputSearchMaterial = () => {
  const queryParams = useGetQueryParams();
  const [search, setSearch] = useState<string>(queryParams.name || "");
  const [searchCategory, setSearchCategory] = useState<string>(
    queryParams.category || ""
  );
  const setQueryParams = useSetQueryParams();
  const onSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log("Submitting:", { name: search, category: searchCategory });
    setQueryParams("category", searchCategory);
    setQueryParams("name", search);
  };
  const onClear = () => {
    setQueryParams("name", "");
    setQueryParams("category", "");
    setSearch("");
    setSearchCategory("");
  };
  return (
    <form
      onSubmit={onSubmit}
      className="flex items-center justify-center gap-3"
    >
      <TextField
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
                <SearchIcon className="text-xl" />
              </InputAdornment>
            ),
          },
        }}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <TextField
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
                <SearchIcon className="text-xl" />
              </InputAdornment>
            ),
          },
        }}
        value={searchCategory}
        onChange={(e) => setSearchCategory(e.target.value)}
      />
      <Button type="submit" size="small" variant="contained">
        Search
      </Button>
      <div
        className="text-gray-500 cursor-pointer rounded-full hover:bg-gray-200"
        onClick={onClear}
      >
        <SearchOffIcon className="m-1  ml-0" />
      </div>
    </form>
  );
};

export default InputSearchMaterial;
