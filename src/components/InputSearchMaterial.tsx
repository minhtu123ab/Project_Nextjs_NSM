"use client";

import {
  Autocomplete,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React, { useState } from "react";
import useSetQueryParams from "@/hooks/useSetQueryParams";
import useGetQueryParams from "@/hooks/useGetQueryParams";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import withDataFetching from "@/HOC/withDataFetching";

const url = ["/material_categories"];

interface IPropInputSearchMaterial {
  state: IHocDataFetchingState;
  fetchData: () => void;
}
interface INameDataFetchingState {
  name: string;
}

const InputSearchMaterial: React.FC<IPropInputSearchMaterial> = ({
  state,
  fetchData,
}) => {
  const { data, error, loadingHoc } = state;
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
  const onClear = () => {
    setQueryParams({
      name: "",
      category: "",
    });
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
      {!error ? (
        <Autocomplete
          disablePortal
          options={dataCategorySearch}
          sx={{ width: 300 }}
          value={
            dataCategory.find((option) => option.name === searchCategory)
              ?.name || null
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
        />
      ) : (
        <div className="flex justify-around items-center bg-white w-[300px] shadow-md rounded-full h-8">
          <span>Error loading data</span>
          <Button
            className="normal-case"
            size="small"
            disabled={loadingHoc}
            onClick={(e) => {
              e.stopPropagation();
              fetchData();
            }}
            variant="contained"
            color="error"
            endIcon={loadingHoc && <CircularProgress size={24} />}
          >
            ReLoad
          </Button>
        </div>
      )}
      <Button
        type="submit"
        size="small"
        variant="contained"
        sx={{ display: "none" }}
      >
        Search
      </Button>
      <IconButton
        className="text-gray-500 cursor-pointer rounded-full hover:bg-gray-200"
        onClick={onClear}
      >
        <SearchOffIcon />
      </IconButton>
    </form>
  );
};

export default withDataFetching(InputSearchMaterial, url);
