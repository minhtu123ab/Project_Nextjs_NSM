import useGetQueryParams from "@/hooks/useGetQueryParams";
import useSetQueryParams from "@/hooks/useSetQueryParams";
import { Pagination } from "@mui/material";
import React, { useEffect } from "react";

interface PaginationTableProps {
  count: number;
  cleanItemToDelete: () => void;
}

const PaginationTable: React.FC<PaginationTableProps> = ({
  count,
  cleanItemToDelete,
}) => {
  const setQueryParams = useSetQueryParams();
  const queryParams = useGetQueryParams();

  useEffect(() => {
    if (Number(queryParams.page) <= 0) {
      setQueryParams("page", "1");
    }
    if (
      count &&
      Number(queryParams.page) >
        Math.ceil(count / Number(process.env.NEXT_PUBLIC_COUNT))
    ) {
      setQueryParams(
        "page",
        Math.ceil(count / Number(process.env.NEXT_PUBLIC_COUNT)).toString()
      );
    }
  }, [count, queryParams.page, setQueryParams]);

  return (
    <div className="py-2 flex justify-center items-center">
      <Pagination
        count={Math.ceil(count / Number(process.env.NEXT_PUBLIC_COUNT))}
        color="primary"
        onChange={(event, value) => {
          setQueryParams("page", value.toString());
          cleanItemToDelete();
        }}
        page={Number(queryParams.page || 1)}
      />
    </div>
  );
};

export default PaginationTable;
