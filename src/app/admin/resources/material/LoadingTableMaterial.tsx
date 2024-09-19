/* eslint-disable react/prop-types */
import ActionTableLoading from "@/components/table/tableLoading/ActionTableLoading";
import { Checkbox, TableCell, TableRow } from "@mui/material";

const LoadingTableMaterial = () => {
  return (
    <TableRow
      sx={{
        animation: "pulse 1.5s infinite",
        backgroundColor: "#e5e7eb",
      }}
    >
      <TableCell>
        <Checkbox
          sx={{
            marginLeft: 2,
          }}
          disabled
        />
      </TableCell>
      <TableCell>
        <div className="w-8 h-4 bg-gray-300 rounded m-5"></div>
      </TableCell>
      <TableCell
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
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
