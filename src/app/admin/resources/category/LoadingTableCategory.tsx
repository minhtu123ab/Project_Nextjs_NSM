import { Checkbox, TableCell, TableRow } from "@mui/material";
import Image from "next/image";

const LoadingTableCategory = () => {
  return (
    <TableRow className="animate-pulse bg-gray-200">
      <TableCell>
        <Checkbox className="transform ml-2" disabled />
      </TableCell>
      <TableCell className="p-4 items">
        <div className="w-full h-4 bg-gray-300 rounded"></div>
      </TableCell>
      <TableCell className="flex justify-center">
        <div className="w-52 h-28 bg-gray-300 rounded-lg mt-2 mb-2"></div>
      </TableCell>
      <TableCell>
        <div className="w-full h-4 bg-gray-300 rounded"></div>
      </TableCell>
      <TableCell>
        <div className="w-full h-4 bg-gray-300 rounded"></div>
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

export default LoadingTableCategory;
