"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import axiosInstance from "@/axios/axiosInstance";
import { toast } from "react-toastify";

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 3,
};

const ModalDelete = React.forwardRef(
  ({ itemDelete, setCheckCallApi }: IModalDelete, ref) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    React.useImperativeHandle(ref, () => ({
      handleClose,
      handleOpen,
    }));

    const onClickDelete = async () => {
      try {
        const newIdDelete: string = Array.isArray(itemDelete)
          ? itemDelete.join(",")
          : itemDelete.id.toString();
        await axiosInstance.delete(`/material_categories/bulk/${newIdDelete}`);
        toast.success("Delete successfully");
        handleClose();
        setCheckCallApi((item) => !item);
      } catch (e) {
        console.log(e);
        toast.error("Delete failed");
      }
    };

    return (
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {Array.isArray(itemDelete)
                ? `Delete All`
                : `Delete ${itemDelete.name}?`}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              {Array.isArray(itemDelete) ? (
                <>
                  Are you sure you want to delete{" "}
                  <span className="font-bold">all</span>?
                </>
              ) : (
                <>
                  Are you sure you want to delete{" "}
                  <span className="font-bold">{itemDelete.name}</span>?
                </>
              )}
            </Typography>
            <div className="flex justify-end mt-10 gap-5">
              <Button
                onClick={handleClose}
                className="normal-case text-base"
                size="small"
                variant="outlined"
              >
                Cannel
              </Button>
              <Button
                className="normal-case text-base"
                size="small"
                variant="contained"
                color="error"
                onClick={onClickDelete}
              >
                Delete
              </Button>
            </div>
          </Box>
        </Modal>
      </div>
    );
  }
);

ModalDelete.displayName = "ModalDelete";

export default ModalDelete;
