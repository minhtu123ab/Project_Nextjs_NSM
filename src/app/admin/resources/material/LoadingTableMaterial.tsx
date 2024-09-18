/* eslint-disable react/prop-types */
import ActionTableLoading from "@/components/table/tableLoading/ActionTableLoading";
import { Checkbox, TableCell, TableRow } from "@mui/material";

const LoadingTableMaterial = () => {
  return (
    <TableRow className="animate-pulse  bg-gray-200">
      <TableCell>
        <Checkbox className="transform ml-2" disabled />
      </TableCell>
      <TableCell>
        <div className="w-8 h-4 bg-gray-300 rounded m-5"></div>
      </TableCell>
      <TableCell className="flex justify-center">
        <div className="w-52 h-28 bg-gray-300 rounded-lg mt-2 mb-2"></div>
      </TableCell>
      <TableCell>
        <div className="w-32 h-4 bg-gray-300 rounded"></div>
      </TableCell>
      <TableCell>
        <div className="w-32 h-4 bg-gray-300 rounded"></div>
      </TableCell>
      <TableCell>
        <div className="w-32 h-4 bg-gray-300 rounded"></div>
      </TableCell>
      <TableCell>
        <div className="w-32 h-4 bg-gray-300 rounded"></div>
      </TableCell>
      <TableCell>
        <div className="w-32 h-4 bg-gray-300 rounded"></div>
      </TableCell>
      <TableCell>
        <div className="w-32 h-4 bg-gray-300 rounded"></div>
      </TableCell>
      <TableCell>
        <div className="w-32 h-4 bg-gray-300 rounded"></div>
      </TableCell>
      <TableCell>
        <div className="w-32 h-4 bg-gray-300 rounded"></div>
      </TableCell>
      <ActionTableLoading />
    </TableRow>
  );
};

export default LoadingTableMaterial;
