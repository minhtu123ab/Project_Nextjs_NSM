import useNavigateAction from "@/hooks/useNavigateAction";
import { IconButton, TableCell } from "@mui/material";
import React from "react";
import {
  HiOutlineEye,
  HiOutlinePencilAlt,
  HiOutlineTrash,
} from "react-icons/hi";

const ActionTable = <T extends IIdData>({
  item,
  openModalDelete,
  openModalDetails,
}: IActionTable<T>) => {
  const { navigateUpdate } = useNavigateAction("update");
  return (
    <TableCell align="center">
      <div className="flex justify-center items-center">
        <IconButton
          sx={{ ":hover": { backgroundColor: "#bbf7d0" } }}
          onClick={(e) => openModalDetails(e, item)}
        >
          <HiOutlineEye color="green" />
        </IconButton>
        <IconButton
          sx={{ ":hover": { backgroundColor: "#bfdbfe" } }}
          onClick={(e) => navigateUpdate(e, item.id)}
        >
          <HiOutlinePencilAlt color="blue" />
        </IconButton>
        <IconButton
          sx={{ ":hover": { backgroundColor: "#fecaca" } }}
          onClick={(e) => openModalDelete(e, item)}
        >
          <HiOutlineTrash color="red" />
        </IconButton>
      </div>
    </TableCell>
  );
};

export default ActionTable;
