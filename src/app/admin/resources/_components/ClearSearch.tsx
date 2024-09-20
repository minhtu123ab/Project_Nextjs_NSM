import useSetQueryParams from "@/hooks/useSetQueryParams";
import { IconButton } from "@mui/material";
import React from "react";
import SearchOffIcon from "@mui/icons-material/SearchOff";

const ClearSearch = ({
  clearStateSearch,
}: {
  clearStateSearch: () => void;
}) => {
  const setQueryParams = useSetQueryParams();

  const onClear = () => {
    setQueryParams({
      name: "",
      category: "",
    });
    clearStateSearch();
  };

  return (
    <IconButton onClick={onClear}>
      <SearchOffIcon />
    </IconButton>
  );
};

export default ClearSearch;
