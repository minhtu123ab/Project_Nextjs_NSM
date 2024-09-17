"use client";

import ModalDelete from "@/components/ModalDelete";
import PaginationTable from "@/components/table/PaginationTable";
import useGetQueryParams from "@/hooks/useGetQueryParams";
import useSelectDelete from "@/hooks/useSelectDelete";
import {
  Checkbox,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import Image from "next/image";
import React from "react";
import LoadingTableCategory from "./LoadingTableCategory";
import data from "./data/data.json";
import TableHeader from "@/components/table/TableHeader";
import TableHeaderAction from "@/components/table/TableHeaderAction";
import useFetchData from "@/hooks/useFetchData";
import useHandleModalDelete from "@/hooks/useHandleModalDelete";
import useNavigateAction from "@/hooks/useNavigateAction";
import { IconButton } from "@mui/material";
import NoDataTable from "@/components/table/NoDataTable";

const dataHeaderTable = data.dataHeaderTable;

const TableCategory = () => {
  const queryParams = useGetQueryParams();

  const {
    itemToDelete,
    modalDeleteAllRef,
    modalDeleteRef,
    openModalDeleteAll,
    openModalDelete,
  } = useHandleModalDelete();

  const { navigateUpdate } = useNavigateAction("formActions/update");

  const { state, reloadState } = useFetchData<IDataCategory>(
    "/material_categories"
  );

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
        <Table className="items-center" aria-label="simple table">
          <TableHeader dataHeaderTable={dataHeaderTable} />
          <TableBody>
            {!state.loading ? (
              state.results.length ? (
                state.results.map((item: IDataCategory, index: number) => (
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

                    <TableCell align="center">{item.name}</TableCell>
                    <TableCell align="center">
                      <span
                        className={`px-3 py-1 rounded-full ${
                          item.price_type === "per_metter"
                            ? "bg-red-300 text-red-800"
                            : "bg-green-300 text-green-800"
                        }`}
                      >
                        {item.price_type === "per_metter"
                          ? "Metter"
                          : "Quantity"}
                      </span>
                    </TableCell>
                    <TableCell align="center">
                      <div className="flex justify-center items-center">
                        <IconButton onClick={(e) => navigateUpdate(e, item.id)}>
                          <Image
                            src={"/iconEdit.svg"}
                            alt=""
                            width={22}
                            height={22}
                            className="w-auto h-auto"
                          />
                        </IconButton>
                        <IconButton onClick={(e) => openModalDelete(e, item)}>
                          <Image
                            src={"/iconDelete.svg"}
                            alt=""
                            width={22}
                            height={22}
                            className="w-auto h-auto"
                          />
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
              }).map((_, index) => <LoadingTableCategory key={index} />)
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
        url="material_categories"
      />
      <ModalDelete
        itemDelete={itemToDelete || []}
        reloadState={reloadState}
        ref={modalDeleteRef}
        cleanItemToDelete={cleanItemToDelete}
        url="material_categories"
      />
    </Paper>
  );
};

export default TableCategory;
