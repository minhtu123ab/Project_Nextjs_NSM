import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Divider } from "@mui/material";
import styleModal from "@/utils/styleModal";

const style = styleModal(800);

const ModalDetailsSupplier = React.forwardRef(
  ({ itemDetails }: { itemDetails: IDataSupplier | undefined }, ref) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    React.useImperativeHandle(ref, () => ({
      handleClose,
      handleOpen,
    }));

    return (
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h5" fontWeight="bold">
            Details of {itemDetails?.name}
          </Typography>
          <Divider sx={{ my: 2 }} />

          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap={2}
          >
            <Box display="flex" flexDirection="column" gap={2} width="100%">
              <Box display="flex">
                <Box flex={1}>
                  <Typography variant="body1" gutterBottom>
                    <strong>ID:</strong> {itemDetails?.id}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    <strong>Name:</strong> {itemDetails?.name}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    <strong>Longitude:</strong> {itemDetails?.longitude}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    <strong>Created At:</strong> {itemDetails?.created_at}
                  </Typography>
                </Box>

                <Box flex={1}>
                  <Typography variant="body1" gutterBottom>
                    <strong>Phone Number:</strong> {itemDetails?.phone_number}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    <strong>Address:</strong> {itemDetails?.address}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    <strong>Latitude:</strong> {itemDetails?.latitude}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    <strong>Updated At:</strong> {itemDetails?.updated_at}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Box display="flex" justifyContent="flex-end">
            <Button
              onClick={handleClose}
              sx={{
                textTransform: "none",
                fontSize: "1rem",
                lineHeight: "1.5rem",
                padding: "6px 20px",
              }}
              size="medium"
              variant="outlined"
              color="error"
            >
              Close
            </Button>
          </Box>
        </Box>
      </Modal>
    );
  }
);

ModalDetailsSupplier.displayName = "ModalDetailsSupplier";

export default ModalDetailsSupplier;
