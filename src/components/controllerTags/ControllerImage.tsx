import VisuallyHiddenInput from "@/utils/VisuallyHiddenInput";
import { Box, Button, Modal } from "@mui/material";
import Image from "next/image";
import React from "react";
import { Controller } from "react-hook-form";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import useChangImage from "@/hooks/useChangImage";
import ZoomInIcon from "@mui/icons-material/ZoomIn";

const ControllerImage: React.FC<IPropControllerImage> = ({
  setValue,
  control,
  urlImageEdit,
  errors,
}) => {
  const { urlImage, handleChangValueImage } =
    useChangImage<ISetValueFormCategory>(setValue);

  const [openModal, setOpenModal] = React.useState(false);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  return (
    <Controller
      control={control}
      name="image"
      render={({ field }) => {
        return field.value.length ? (
          <div className="relative cursor-pointer group flex flex-col items-center gap-3">
            <div
              onClick={handleOpenModal}
              className="relative w-72 h-44 rounded-3xl overflow-hidden"
            >
              <Image
                src={urlImage || urlImageEdit || ""}
                priority
                alt="Uploaded Image"
                unoptimized={true}
                width={100}
                height={100}
                className="w-72 h-44 rounded-3xl object-cover transition-transform duration-300 group-hover:scale-125"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <ZoomInIcon className="text-white text-4xl" />
              </div>
            </div>
            <Modal open={openModal} onClose={handleCloseModal}>
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "auto",
                  height: "auto",
                  maxWidth: "90vw",
                  maxHeight: "90vh",
                  p: 0,
                  m: 0,
                }}
              >
                <Image
                  src={urlImage || urlImageEdit || ""}
                  alt="Enlarged Image"
                  unoptimized={true}
                  width={400}
                  height={400}
                  className="object-contain"
                  style={{ width: "100%", height: "auto" }}
                  quality={100}
                />
              </Box>
            </Modal>
            <Button
              component="label"
              variant="outlined"
              startIcon={<FileUploadOutlinedIcon />}
              className="normal-case text-base mt-2"
              size="small"
            >
              Change Image
              <VisuallyHiddenInput
                type="file"
                accept="image/*"
                onChange={(e) =>
                  handleChangValueImage(Array.from(e.target.files || []))
                }
                multiple
              />
            </Button>
          </div>
        ) : (
          <div>
            <div
              onClick={() => document.getElementById("fileInput")?.click()}
              className="w-72 h-44 rounded-3xl bg-gray-300 flex items-center justify-center flex-col cursor-pointer hover:bg-gray-200"
            >
              <CloudUploadOutlinedIcon className="text-9xl" />
              <p>
                Image<span className="text-red-500">*</span>:
                .png/.jpg/.jpeg/.svg
              </p>
            </div>
            <input
              id="fileInput"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) =>
                handleChangValueImage(Array.from(e.target.files || []))
              }
            />
            {errors.image && (
              <span className="text-red-500">{errors.image.message}</span>
            )}
          </div>
        );
      }}
    />
  );
};

export default ControllerImage;
