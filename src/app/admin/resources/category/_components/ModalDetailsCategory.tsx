import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Image from "next/image";
import { Divider } from "@mui/material";
import styleModal from "@/utils/styleModal";

const style = styleModal(600);

const ModalDetailsCategory = React.forwardRef(
  ({ itemDetails }: { itemDetails: IDataCategory | undefined }, ref) => {
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

          <Box display="flex" gap={2}>
            <Box display="flex" justifyContent="center" alignItems="center">
              <Image
                src={itemDetails?.image || ""}
                alt={itemDetails?.name || "Image"}
                width={150}
                height={150}
                style={{ borderRadius: "8px", objectFit: "cover" }}
                unoptimized={true}
                className="w-44 h-auto"
              />
            </Box>

            <Box flex={1}>
              <Typography variant="body1" gutterBottom>
                <strong>ID:</strong> {itemDetails?.id}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Name:</strong> {itemDetails?.name}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Price Type:</strong> {itemDetails?.price_type}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Created At:</strong> {itemDetails?.created_at}
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* Close Button */}
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

ModalDetailsCategory.displayName = "ModalDetailsCategory";

export default ModalDetailsCategory;
