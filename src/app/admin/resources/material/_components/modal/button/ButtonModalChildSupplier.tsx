import useHandleModalDetails from "@/app/admin/resources/_hooks/useHandleModalDetails";
import { IconButton, Typography } from "@mui/material";
import React from "react";
import { HiOutlineEye } from "react-icons/hi";
import ModalDetailsSupplier from "../modalChild/ModalDetailsSupplier";

const ButtonModalChildSupplier = ({
  itemDetailsMaterial,
}: {
  itemDetailsMaterial: IDataMaterial | undefined;
}) => {
  const { itemDetails, modalDetailsRef, openModalDetails } =
    useHandleModalDetails<IDataSupplier>();
  return (
    <Typography variant="body1" gutterBottom>
      <strong>Supplier:</strong> {itemDetailsMaterial?.supplier?.name}{" "}
      <IconButton
        sx={{ ":hover": { backgroundColor: "#bbf7d0" } }}
        onClick={(e) => {
          if (itemDetailsMaterial?.category) {
            openModalDetails(e, itemDetailsMaterial.supplier);
          }
        }}
      >
        <HiOutlineEye color="green" />
      </IconButton>
      <React.Fragment>
        <ModalDetailsSupplier itemDetails={itemDetails} ref={modalDetailsRef} />
      </React.Fragment>
    </Typography>
  );
};

export default ButtonModalChildSupplier;
