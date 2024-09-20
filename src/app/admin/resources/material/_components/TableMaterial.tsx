"use client";

import PaginationTable from "@/components/table/PaginationTable";
import useGetQueryParams from "@/hooks/useGetQueryParams";

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

import data from "../_data/data.json";
import TableHeader from "@/components/table/TableHeader";
import useFetchData from "../../_hooks/useFetchData";
import useSelectDelete from "../../_hooks/useSelectDelete";
import ModalDelete from "../../_components/ModalDelete";
import ActionTable from "../../_components/table/ActionTable";
import NoDataTable from "@/components/table/NoDataTable";
import TableHeaderAction from "../../_components/table/TableHeaderAction";
import useHandleModalDelete from "../../_hooks/useHandleModalDelete";
import useHandleModalDetails from "../../_hooks/useHandleModalDetails";
import ModalDetailsMaterial from "./modal/ModalDetailsMaterial";
import LoadingTable from "../../_components/table/tableLoading/LoadingTable";

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

  const { itemDetails, modalDetailsRef, openModalDetails } =
    useHandleModalDetails<IDataMaterial>();

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
          sx={{
            alignItems: "center",
          }}
          aria-label="simple table"
        >
          <TableHeader dataHeaderTable={dataHeaderTable} />
          <TableBody>
            {!state.loading ? (
              state.results.length ? (
                state.results.map((item: IDataMaterial, index: number) => (
                  <TableRow
                    sx={{
                      cursor: "pointer",
                      "&:hover": {
                        backgroundColor: "#f3f4f6",
                      },
                      ...(idDelete.includes(item.id) && {
                        backgroundColor: "#f3f4f6",
                      }),
                    }}
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
                    <TableCell align="center" className="truncate max-w-32">
                      {item.name}
                    </TableCell>
                    <ActionTable
                      item={item}
                      openModalDelete={openModalDelete}
                      openModalDetails={openModalDetails}
                    />
                  </TableRow>
                ))
              ) : (
                <NoDataTable size={dataHeaderTable.length} />
              )
            ) : (
              Array.from({
                length: Number(process.env.NEXT_PUBLIC_COUNT),
              }).map((_, index) => <LoadingTable key={index} />)
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <PaginationTable
        count={state.count}
        cleanItemToDelete={cleanItemToDelete}
      />
      <ModalDetailsMaterial itemDetails={itemDetails} ref={modalDetailsRef} />
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
