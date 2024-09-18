import { IconButton, TableCell } from "@mui/material";
import React from "react";
import {
  HiOutlineEye,
  HiOutlinePencilAlt,
  HiOutlineTrash,
} from "react-icons/hi";

const ActionTableLoading = () => {
  return (
    <TableCell>
      <div className="flex justify-center items-center">
        <IconButton>
          <HiOutlineEye />
        </IconButton>
        <IconButton>
          <HiOutlinePencilAlt />
        </IconButton>
        <IconButton>
          <HiOutlineTrash />
        </IconButton>
      </div>
    </TableCell>
  );
};

export default ActionTableLoading;
