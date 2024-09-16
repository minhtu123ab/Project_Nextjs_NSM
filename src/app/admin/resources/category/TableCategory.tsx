"use client";

import axiosInstance from "@/axios/axiosInstance";
import ModalDelete from "@/components/ModalDelete";
import PaginationTable from "@/components/PaginationTable";
import useGetQueryParams from "@/hooks/useGetQueryParams";
import useSelectDelete from "@/hooks/useSelectDelete";
import {
  Button,
  Checkbox,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import LoadingTableCategory from "./LoadingTableCategory";

const TableCategory = () => {
  const router = useRouter();
  const queryParamsUrl = useSearchParams();

  const [state, setState] = useState<IStateCategory>({
    count: 0,
    results: [],
    loading: true,
    error: false,
  });
  const [itemToDelete, setItemToDelete] = useState<IItemToDelete>();
  const [checkCallApi, setCheckCallApi] = useState(false);

  const queryParams = useGetQueryParams();

  const modalDeleteAllRef = useRef<IHandleModal>(null);
  const modalDeleteRef = useRef<IHandleModal>(null);

  const openModalDeleteAll = () => {
    modalDeleteAllRef.current?.handleOpen();
  };
  const openModalDelete = (
    e: { stopPropagation: () => void },
    item: IItemToDelete
  ) => {
    e.stopPropagation();
    setItemToDelete(item);
    modalDeleteRef.current?.handleOpen();
  };

  const onClickUpdate = (e: { stopPropagation: () => void }, id: string) => {
    e.stopPropagation();
    router.push(
      `/admin/resources/category/formActions/update/${id}?${queryParamsUrl.toString()}`
    );
  };

  const {
    checkAll,
    idDelete,
    setCheckAll,
    setIdDelete,
    onClickDeleteAll,
    onClickSelectDelete,
  } = useSelectDelete(state.results as IIdData[]);

  useEffect(() => {
    try {
      setState((prev) => ({ ...prev, loading: true }));
      const fetchData = async () => {
        const response = await axiosInstance.get("/material_categories", {
          params: {
            limit: process.env.NEXT_PUBLIC_COUNT,
            offset: (Number(queryParams.page || 1) - 1) * 5,
            name: queryParams.name,
          },
        });
        setState((prev) => ({
          ...prev,
          count: response.data.count,
          results: response.data.results,
        }));
        setIdDelete([]);
        setCheckAll(false);
      };
      fetchData();
    } catch (err) {
      console.log(err);
      setState((prev) => ({ ...prev, error: true }));
    } finally {
      setState((prev) => ({ ...prev, loading: false }));
    }
  }, [
    queryParams.name,
    queryParams.page,
    setCheckAll,
    setIdDelete,
    checkCallApi,
  ]);
  return (
    <Paper className="w-full rounded-lg">
      <div
        className={`border-b flex items-center justify-between px-10 py-2 ${
          checkAll && "bg-gray-100"
        }`}
      >
        <Checkbox checked={checkAll} onClick={onClickDeleteAll} />
        {idDelete.length ? (
          <Button
            startIcon={
              <Image
                src={"/iconDelete.svg"}
                alt=""
                width={16}
                height={16}
                className="w-auto h-auto"
              />
            }
            onClick={openModalDeleteAll}
            variant="contained"
            color="error"
            className="normal-case text-base"
            size="small"
          >
            {idDelete.length} Select
          </Button>
        ) : (
          ""
        )}
      </div>
      <TableContainer>
        <Table className="items-center" aria-label="simple table">
          <TableHead>
            <TableRow className="bg-gray-100">
              <TableCell align="center"></TableCell>
              <TableCell
                sx={{ fontWeight: "bold", fontSize: 18 }}
                align="center"
              >
                No
              </TableCell>
              <TableCell
                sx={{ fontWeight: "bold", fontSize: 18 }}
                align="center"
              >
                Image
              </TableCell>
              <TableCell
                sx={{ fontWeight: "bold", fontSize: 18 }}
                align="center"
              >
                Name
              </TableCell>
              <TableCell
                sx={{ fontWeight: "bold", fontSize: 18 }}
                align="center"
              >
                Price Type
              </TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>
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
                        <div
                          onClick={(e) => onClickUpdate(e, item.id)}
                          className="cursor-pointer hover:bg-slate-200 p-2 rounded-lg"
                        >
                          <Image
                            src={"/iconEdit.svg"}
                            alt=""
                            width={22}
                            height={22}
                          />
                        </div>
                        <div
                          onClick={(e) => openModalDelete(e, item)}
                          className="cursor-pointer hover:bg-slate-200 p-2 rounded-lg"
                        >
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
                ))
              ) : (
                <TableRow>
                  <TableCell
                    className="text-4xl font-mono font-bold text-gray-500"
                    colSpan={6}
                    align="center"
                  >
                    No data
                  </TableCell>
                </TableRow>
              )
            ) : (
              Array.from({
                length: Number(process.env.NEXT_PUBLIC_COUNT),
              }).map((_, index) => <LoadingTableCategory key={index} />)
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <PaginationTable count={state.count} />
      <ModalDelete
        itemDelete={idDelete}
        setCheckCallApi={setCheckCallApi}
        ref={modalDeleteAllRef}
      />
      <ModalDelete
        itemDelete={itemToDelete || []}
        setCheckCallApi={setCheckCallApi}
        ref={modalDeleteRef}
      />
    </Paper>
  );
};

export default TableCategory;
