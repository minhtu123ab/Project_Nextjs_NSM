import { TableCell, TableHead, TableRow } from "@mui/material";
import React from "react";

interface ITableHeader {
  dataHeaderTable: string[];
}

const TableHeader: React.FC<ITableHeader> = ({ dataHeaderTable }) => {
  return (
    <TableHead>
      <TableRow sx={{ backgroundColor: "#f3f4f6" }}>
        {dataHeaderTable.map((item, index) => (
          <TableCell
            sx={{ fontWeight: "bold", fontSize: 18 }}
            align="center"
            key={index}
          >
            {item}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default TableHeader;
