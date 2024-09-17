import useNavigateAction from "@/hooks/useNavigateAction";
import { IconButton, TableCell } from "@mui/material";
import React from "react";
import {
  HiOutlineEye,
  HiOutlinePencilAlt,
  HiOutlineTrash,
} from "react-icons/hi";

interface IActionTable<T> {
  item: T;
  openModalDelete: (
    e: {
      stopPropagation: () => void;
    },
    item: T
  ) => void;
}

const ActionTable = <T extends IIdData>({
  item,
  openModalDelete,
}: IActionTable<T>) => {
  const { navigateUpdate } = useNavigateAction(`formActions/update`);
  return (
    <TableCell align="center">
      <div className="flex justify-center items-center">
        <IconButton
          className="hover:bg-green-200"
          onClick={(e) => e.stopPropagation()}
        >
          <HiOutlineEye color="green" />
        </IconButton>
        <IconButton
          className="hover:bg-blue-200"
          onClick={(e) => navigateUpdate(e, item.id)}
        >
          <HiOutlinePencilAlt color="blue" />
        </IconButton>
        <IconButton
          className="hover:bg-red-200"
          onClick={(e) => openModalDelete(e, item)}
        >
          <HiOutlineTrash color="red" />
        </IconButton>
      </div>
    </TableCell>
  );
};

export default ActionTable;
