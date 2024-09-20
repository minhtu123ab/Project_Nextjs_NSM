"use client";

import {
  Autocomplete,
  Button,
  CircularProgress,
  InputAdornment,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React, { useState } from "react";
import useSetQueryParams from "@/hooks/useSetQueryParams";
import useGetQueryParams from "@/hooks/useGetQueryParams";
import withDataFetching from "@/HOC/withDataFetching";
import ClearSearch from "../../_components/ClearSearch";

const url = ["/material_categories"];

interface IPropInputSearchMaterial {
  state?: IHocDataFetchingState;
  fetchData?: () => void;
}
interface INameDataFetchingState {
  name: string;
}

const InputSearchMaterial: React.FC<IPropInputSearchMaterial> = ({
  state,
  fetchData,
}) => {
  const { data, error, loadingHoc } = state || {
    data: {},
    error: null,
    loadingHoc: false,
  };
  const dataCategory = (data[url[0]] || []) as INameDataFetchingState[];
  const dataCategorySearch = [
    ...Array.from(new Set(dataCategory.map((item) => item.name))),
  ];

  const queryParams = useGetQueryParams();
  const [search, setSearch] = useState<string>(queryParams.name || "");
  const [searchCategory, setSearchCategory] = useState<string>(
    queryParams.category || ""
  );
  const setQueryParams = useSetQueryParams();

  const onSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setQueryParams({
      name: search,
      category: searchCategory,
    });
  };

  const clearStateSearch = () => {
    setSearch("");
    setSearchCategory("");
  };
  return (
    <form
      onSubmit={onSubmit}
      className="flex items-center justify-center gap-3"
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

      <Autocomplete
        disablePortal
        options={error ? ["Error Data"] : dataCategorySearch}
        sx={{ width: 300 }}
        value={
          dataCategory.find((option) => option.name === searchCategory)?.name ||
          searchCategory
        }
        onChange={(event, newValue) => {
          setSearchCategory(newValue || "");
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            onChange={(e) => setSearchCategory(e.target.value)}
            size="small"
            placeholder="Search Category"
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
          />
        )}
        renderOption={(props, option) => {
          if (error) {
            return (
              <div
                className=" flex justify-around pt-1 w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <span>Error loading data</span>
                <Button
                  className="normal-case"
                  size="small"
                  disabled={loadingHoc}
                  onClick={(e) => {
                    e.stopPropagation();
                    fetchData && fetchData();
                  }}
                  variant="contained"
                  color="error"
                  endIcon={loadingHoc && <CircularProgress size={24} />}
                >
                  ReLoad
                </Button>
              </div>
            );
          } else {
            return (
              <li {...props}>
                <span>{option}</span>
              </li>
            );
          }
        }}
      />

      <Button
        type="submit"
        size="small"
        variant="contained"
        sx={{ display: "none" }}
      >
        Search
      </Button>
      <ClearSearch clearStateSearch={clearStateSearch} />
    </form>
  );
};

export default withDataFetching(InputSearchMaterial, url);
