import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Image from "next/image";
import { Divider } from "@mui/material";
import ButtonModalChildCategory from "./button/ButtonModalChildCategory";
import ButtonModalChildSupplier from "./button/ButtonModalChildSupplier";
import styleModal from "@/utils/styleModal";

const style = styleModal(700);

const ModalDetailsMaterial = React.forwardRef(
  ({ itemDetails }: { itemDetails: IDataMaterial | undefined }, ref) => {
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
            <Box display="flex" justifyContent="center" alignItems="center">
              <Image
                src={itemDetails?.image || ""}
                alt={itemDetails?.name || "Image"}
                width={200}
                height={200}
                unoptimized={true}
                className="w-52 h-auto rounded-lg object-cover"
              />
            </Box>

            <Box display="flex" flexDirection="column" gap={2} width="100%">
              <Box width="100%" textAlign="center">
                <Typography variant="body1" gutterBottom>
                  <strong>ID:</strong> {itemDetails?.id}
                </Typography>
              </Box>

              <Box display="flex">
                <Box flex={1}>
                  <Typography variant="body1" gutterBottom>
                    <strong>Part Number:</strong> {itemDetails?.part_number}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    <strong>Name:</strong> {itemDetails?.name}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    <strong>Small Title:</strong> {itemDetails?.small_title}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    <strong>Created At:</strong> {itemDetails?.created_at}
                  </Typography>
                  <ButtonModalChildCategory itemDetailsMaterial={itemDetails} />
                </Box>

                <Box flex={1}>
                  <Typography variant="body1" gutterBottom>
                    <strong>Basic Price:</strong> {itemDetails?.basic_price}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    <strong>Type:</strong> {itemDetails?.type}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    <strong>Large Title:</strong> {itemDetails?.large_title}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    <strong>Updated At:</strong> {itemDetails?.updated_at}
                  </Typography>
                  <ButtonModalChildSupplier itemDetailsMaterial={itemDetails} />
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

ModalDetailsMaterial.displayName = "ModalDetailsMaterial";

export default ModalDetailsMaterial;
