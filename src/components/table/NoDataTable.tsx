import { TableCell, TableRow } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const NoDataTable = ({ size }: { size: number }) => {
  return (
    <TableRow>
      <TableCell colSpan={size} align="center">
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          padding={2}
          sx={{ color: "#6b7280" }}
        >
          <ErrorOutlineIcon style={{ fontSize: 100, color: "#b0b0b0" }} />
          <span className="text-4xl font-mono font-bold mt-2">No Data</span>
        </Box>
      </TableCell>
    </TableRow>
  );
};

export default NoDataTable;
