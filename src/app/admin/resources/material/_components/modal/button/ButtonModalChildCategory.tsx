import useHandleModalDetails from "@/app/admin/resources/_hooks/useHandleModalDetails";
import ModalDetailsCategory from "@/app/admin/resources/category/_components/ModalDetailsCategory";
import { IconButton, Typography } from "@mui/material";
import React from "react";
import { HiOutlineEye } from "react-icons/hi";

const ButtonModalChildCategory = ({
  itemDetailsMaterial,
}: {
  itemDetailsMaterial: IDataMaterial | undefined;
}) => {
  const { itemDetails, modalDetailsRef, openModalDetails } =
    useHandleModalDetails<IDataCategory>();
  return (
    <Typography variant="body1" gutterBottom>
      <strong>Category:</strong> {itemDetailsMaterial?.category?.name}{" "}
      <IconButton
        sx={{ ":hover": { backgroundColor: "#bbf7d0" } }}
        onClick={(e) => {
          if (itemDetailsMaterial?.category) {
            openModalDetails(e, itemDetailsMaterial.category);
          }
        }}
      >
        <HiOutlineEye color="green" />
      </IconButton>
      <React.Fragment>
        <ModalDetailsCategory itemDetails={itemDetails} ref={modalDetailsRef} />
      </React.Fragment>
    </Typography>
  );
};

export default ButtonModalChildCategory;
