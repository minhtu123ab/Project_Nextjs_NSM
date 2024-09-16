import { Button, Checkbox } from "@mui/material";
import Image from "next/image";
import React from "react";

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
          startIcon={
            <Image
              src={"/iconDelete.svg"}
              alt=""
              width={16}
              height={16}
              className="w-auto h-auto"
            />
          }
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
