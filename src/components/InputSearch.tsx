import { IconButton, InputAdornment, TextField } from "@mui/material";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

interface IInputSearch {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

const InputSearch: React.FC<IInputSearch> = ({ search, setSearch }) => {
  const clearSearch = () => {
    setSearch("");
  };

  return (
    <TextField
      type="text"
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
          endAdornment: search && (
            <InputAdornment position="end">
              <IconButton size="small" onClick={clearSearch}>
                <ClearIcon sx={{ color: "grey" }} fontSize="small" />
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  );
};

export default InputSearch;
