import Image from "next/image";
import React, { useEffect } from "react";
import {
  Button,
  Paper,
  Select,
  TextField,
  Modal,
  Box,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import VisuallyHiddenInput from "@/utils/VisuallyHiddenInput";
import useFormActions from "../../hooks/useFormActions";
import useChangImage from "@/hooks/useChangImage";
import { Controller } from "react-hook-form";
import data from "@/app/admin/resources/category/data/data.json";

const dataPriceType = data.dataPriceType;

const FormActionCategory: React.FC<IPropFormActionCategory> = ({
  onSubmit,
  setValue,
  control,
  errors,
  handleSubmit,
}) => {
  const [openModal, setOpenModal] = React.useState(false);
  const [formData, setFormData] = React.useState<IDataSubmitCategory | null>(
    null
  );
  const [loading, setLoading] = React.useState(false);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleSubmitAddFormData = (data: IDataSubmitCategory) => {
    setFormData(data);
    setLoading(true);
  };

  const { onClickBack } = useFormActions();

  useEffect(() => {
    if (loading && formData) {
      onSubmit(formData);
      setLoading(false);
    }
  }, [loading, formData, onSubmit]);

  const { urlImage, handleChangValueImage } = useChangImage(setValue);

  return (
    <div className="p-5">
      <h1 className="text-center text-4xl text-gray-500">Create Category</h1>
      <form
        onSubmit={handleSubmit(handleSubmitAddFormData)}
        className="flex justify-center px-24 py-10 gap-5"
      >
        <div className="flex-[2] flex justify-center">
          <div>
            <Paper className="p-4 rounded-3xl flex justify-around flex-col items-center">
              {
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
                            src={urlImage || ""}
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
                              src={urlImage || ""}
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
                              handleChangValueImage(
                                Array.from(e.target.files || [])
                              )
                            }
                            multiple
                          />
                        </Button>
                      </div>
                    ) : (
                      <div>
                        <div
                          onClick={() =>
                            document.getElementById("fileInput")?.click()
                          }
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
                            handleChangValueImage(
                              Array.from(e.target.files || [])
                            )
                          }
                        />
                        {errors.image && (
                          <span className="text-red-500">
                            {errors.image.message}
                          </span>
                        )}
                      </div>
                    );
                  }}
                />
              }
            </Paper>
          </div>
        </div>
        <Paper className="p-8 flex-[3] rounded-3xl">
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label htmlFor="name">
                Name<span className="text-red-500">*</span>:
              </label>
              <div className="flex flex-col">
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      size="small"
                      id="name"
                      {...field}
                      placeholder="Name"
                    />
                  )}
                />
                {errors.name && (
                  <span className="text-red-500">{errors.name.message}</span>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="price_type">
                Price Type<span className="text-red-500">*</span>:
              </label>
              <div className="flex flex-col">
                <Controller
                  name="price_type"
                  control={control}
                  render={({ field }) => (
                    <Select
                      id="price_type"
                      size="small"
                      {...field}
                      placeholder="Price Type"
                    >
                      {dataPriceType.map((item, index) => (
                        <MenuItem value={item.value} key={index}>
                          {item.name}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
                {errors.price_type && (
                  <span className="text-red-500">
                    {errors.price_type.message}
                  </span>
                )}
              </div>
            </div>
            <div className="flex justify-around mt-3">
              <Button
                disabled={loading}
                className="w-24"
                variant="outlined"
                onClick={onClickBack}
              >
                Back
              </Button>
              <Button
                disabled={loading}
                endIcon={loading && <CircularProgress size={24} />}
                className="w-24"
                variant="contained"
                type="submit"
              >
                Create
              </Button>
            </div>
          </div>
        </Paper>
      </form>
    </div>
  );
};

export default FormActionCategory;
