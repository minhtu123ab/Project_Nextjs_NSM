import ActionTableLoading from "@/components/table/tableLoading/ActionTableLoading";
import { Checkbox, TableCell, TableRow } from "@mui/material";

const LoadingTableCategory = () => {
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
      <TableCell sx={{ padding: 1, alignItems: "center" }}>
        <div className="w-full h-4 bg-gray-300 rounded"></div>
      </TableCell>
      <TableCell
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <div className="w-52 h-28 bg-gray-300 rounded-lg mt-2 mb-2"></div>
      </TableCell>
      <TableCell>
        <div className="w-full h-4 bg-gray-300 rounded"></div>
      </TableCell>
      <TableCell>
        <div className="w-full h-4 bg-gray-300 rounded"></div>
      </TableCell>
      <ActionTableLoading />
    </TableRow>
  );
};

export default LoadingTableCategory;
