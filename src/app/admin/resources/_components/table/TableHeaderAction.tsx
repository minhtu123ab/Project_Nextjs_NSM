import { Button, Checkbox } from "@mui/material";
import React from "react";
import { HiOutlineTrash } from "react-icons/hi";

interface ITableHeaderAction {
  checkAll: boolean;
  idDelete: string[];
  onClickDeleteAll: () => void;
  openModalDeleteAll: () => void;
}

const TableHeaderAction: React.FC<ITableHeaderAction> = ({
  checkAll,
  idDelete,
  openModalDeleteAll,
  onClickDeleteAll,
}) => {
  return (
    <div
      className={`border-b flex items-center justify-between px-8 py-2 ${
        checkAll && "bg-gray-100"
      }`}
    >
      <Checkbox checked={checkAll} onClick={onClickDeleteAll} />
      {idDelete.length ? (
        <Button
          startIcon={<HiOutlineTrash />}
          onClick={openModalDeleteAll}
          variant="contained"
          color="error"
          sx={{ textTransform: "none", fontSize: "1rem", lineHeight: "1.5rem" }}
          size="small"
        >
          {idDelete.length} Select
        </Button>
      ) : (
        ""
      )}
    </div>
  );
};

export default TableHeaderAction;
