/* eslint-disable react/prop-types */
import { Checkbox, TableCell, TableRow } from "@mui/material";
import Image from "next/image";

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
        <div className="w-44 h-24 bg-gray-300 rounded-lg mt-2 mb-2"></div>
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
      <TableCell>
        <div className="flex justify-center items-center">
          <div className="cursor-not-allowed p-2 rounded-lg">
            <Image src={"/iconEdit.svg"} alt="" width={22} height={22} />
          </div>
          <div className="cursor-not-allowed p-2 rounded-lg">
            <Image
              src={"/iconDelete.svg"}
              alt=""
              width={22}
              height={22}
              className="w-auto h-auto"
            />
          </div>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default LoadingTableMaterial;
