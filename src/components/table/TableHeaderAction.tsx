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
      className={`border-b flex items-center justify-between px-10 py-2 ${
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
          className="normal-case text-base"
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
