import React from "react";
import { Button, Paper, CircularProgress } from "@mui/material";
import useFormActions from "../../_hooks/useFormActions";
import data from "@/app/admin/resources/category/_data/data.json";
import ControllerImage from "@/components/controllerTags/ControllerImage";
import ControllerInput from "@/components/controllerTags/ControllerInput";
import ControllerSelect from "@/components/controllerTags/ControllerSelect";
import useSubmitNoDoubleClick from "@/hooks/useSubmitNoDoubleClick";

const dataPriceType = data.dataPriceType;

const FormActionCategory: React.FC<IPropFormAction> = ({
  setValue,
  control,
  errors,
  handleSubmit,
  action,
  urlImageEdit,
  id,
}) => {
  const { onClickBack, onSubmit } = useFormActions(
    `${action as actionType}`,
    id
  );

  const { handleSubmitAddFormData, loading } =
    useSubmitNoDoubleClick<IDataSubmitCategory>(onSubmit);

  return (
    <div className="p-5">
      <h1 className="text-center text-4xl text-gray-500">{action} Category</h1>
      <form
        onSubmit={handleSubmit(handleSubmitAddFormData)}
        className="flex justify-center px-24 py-10 gap-5"
      >
        <div className="flex-[2] flex justify-center">
          <div>
            <Paper
              sx={{
                padding: "1rem",
                borderRadius: "1.5rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <ControllerImage
                setValue={setValue}
                control={control}
                urlImageEdit={urlImageEdit}
                errors={errors}
              />
            </Paper>
          </div>
        </div>
        <Paper sx={{ padding: "2rem", flex: 3, borderRadius: "1.5rem" }}>
          <div className="flex flex-col gap-5">
            <ControllerInput
              control={control}
              errors={errors}
              name="name"
              label="Name"
              required={true}
              type="text"
            />
            <ControllerSelect
              control={control}
              errors={errors}
              name="price_type"
              label="Price Type"
              required={true}
              data={dataPriceType}
              type="select"
            />

            <div className="flex justify-around mt-3">
              <Button
                disabled={loading}
                variant="outlined"
                onClick={onClickBack}
                sx={{ textTransform: "none", width: "6rem" }}
              >
                Back
              </Button>
              <Button
                disabled={loading}
                endIcon={loading && <CircularProgress size={24} />}
                sx={{ textTransform: "none", width: "6rem" }}
                variant="contained"
                type="submit"
              >
                {action}
              </Button>
            </div>
          </div>
        </Paper>
      </form>
    </div>
  );
};

export default FormActionCategory;
