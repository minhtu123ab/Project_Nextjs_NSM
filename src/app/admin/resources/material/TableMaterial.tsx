"use client";

import ModalDelete from "@/components/ModalDelete";
import PaginationTable from "@/components/table/PaginationTable";
import useGetQueryParams from "@/hooks/useGetQueryParams";
import useSelectDelete from "@/hooks/useSelectDelete";
import {
  Checkbox,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import Image from "next/image";
import React from "react";

import data from "./data/data.json";
import TableHeader from "@/components/table/TableHeader";
import TableHeaderAction from "@/components/table/TableHeaderAction";
import useFetchData from "@/hooks/useFetchData";
import useHandleModalDelete from "@/hooks/useHandleModalDelete";
import useNavigateAction from "@/hooks/useNavigateAction";
import LoadingTableMaterial from "./LoadingTableMaterial";
import NoDataTable from "@/components/table/NoDataTable";
import { HiOutlineEye, HiOutlinePencilAlt } from "react-icons/hi";
import { HiOutlineTrash } from "react-icons/hi";

const dataHeaderTable = data.dataHeaderTable;

const TableMaterial = () => {
  const queryParams = useGetQueryParams();

  const {
    itemToDelete,
    modalDeleteAllRef,
    modalDeleteRef,
    openModalDeleteAll,
    openModalDelete,
  } = useHandleModalDelete();

  const { navigateUpdate } = useNavigateAction("formActions/update");

  const { state, reloadState } = useFetchData<IDataMaterial>("/material");

  const cleanItemToDelete = () => {
    setIdDelete([]);
    setCheckAll(false);
  };

  const {
    checkAll,
    idDelete,
    setCheckAll,
    setIdDelete,
    onClickDeleteAll,
    onClickSelectDelete,
  } = useSelectDelete(state.results as IIdData[]);

  return (
    <Paper className="w-full rounded-lg">
      <TableHeaderAction
        checkAll={checkAll}
        idDelete={idDelete}
        onClickDeleteAll={onClickDeleteAll}
        openModalDeleteAll={openModalDeleteAll}
      />
      <TableContainer>
        <Table
          className="items-center min-w-[1800px]"
          aria-label="simple table"
        >
          <TableHeader dataHeaderTable={dataHeaderTable} />
          <TableBody>
            {!state.loading ? (
              state.results.length ? (
                state.results.map((item: IDataMaterial, index: number) => (
                  <TableRow
                    className={`cursor-pointer hover:bg-gray-100 ${
                      idDelete.includes(item.id) && "bg-gray-100"
                    }`}
                    onClick={() => onClickSelectDelete(item as IIdData)}
                    key={index}
                  >
                    <TableCell align="center">
                      <Checkbox checked={idDelete.includes(item.id)} />
                    </TableCell>
                    <TableCell align="center">
                      {(Number(queryParams.page) - 1) *
                        Number(process.env.NEXT_PUBLIC_COUNT) +
                        index +
                        1}
                    </TableCell>
                    <TableCell align="center">
                      <div className="flex justify-center items-center">
                        <Image
                          src={item.image}
                          unoptimized={true}
                          alt=""
                          width={250}
                          height={150}
                          className="w-52 h-28 object-cover rounded-lg"
                          priority
                        />
                      </div>
                    </TableCell>

                    <TableCell align="center">
                      <span className="bg-indigo-300 px-2 p-1 rounded-full text-indigo-800">
                        {item.part_number}
                      </span>
                    </TableCell>
                    <TableCell align="center" className="truncate max-w-36">
                      {item.name}
                    </TableCell>
                    <TableCell align="center">
                      <span
                        className={
                          item.type
                            ? "bg-rose-300 px-2 p-1 rounded-full text-rose-800"
                            : ""
                        }
                      >
                        {item.type}
                      </span>
                    </TableCell>
                    <TableCell align="center" className="truncate max-w-36">
                      {item.large_title}
                    </TableCell>
                    <TableCell align="center" className="truncate max-w-36">
                      {item.small_title}
                    </TableCell>
                    <TableCell align="center">
                      <span className="px-2 py-1 bg-lime-300 rounded-full text-lime-800">
                        {item.basic_price}
                      </span>
                    </TableCell>
                    <TableCell className="truncate max-w-36" align="center">
                      <span className="bg-orange-300 px-2 py-1 rounded-full text-orange-800">
                        {item.category.name}
                      </span>
                    </TableCell>
                    <TableCell className="truncate max-w-36" align="center">
                      <span className="bg-cyan-300 px-2 py-1 rounded-full text-cyan-800">
                        {item.supplier.name}
                      </span>
                    </TableCell>
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
                  </TableRow>
                ))
              ) : (
                <NoDataTable size={dataHeaderTable.length} />
              )
            ) : (
              Array.from({
                length: Number(process.env.NEXT_PUBLIC_COUNT),
              }).map((_, index) => <LoadingTableMaterial key={index} />)
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <PaginationTable
        count={state.count}
        cleanItemToDelete={cleanItemToDelete}
      />
      <ModalDelete
        itemDelete={idDelete}
        reloadState={reloadState}
        ref={modalDeleteAllRef}
        cleanItemToDelete={cleanItemToDelete}
        url="material"
      />
      <ModalDelete
        itemDelete={itemToDelete || []}
        reloadState={reloadState}
        ref={modalDeleteRef}
        cleanItemToDelete={cleanItemToDelete}
        url="material"
      />
    </Paper>
  );
};

export default TableMaterial;
