import React from "react";
import { Button, Paper, CircularProgress } from "@mui/material";
import useFormActions from "../../hooks/useFormActions";
import data from "@/app/admin/resources/category/data/data.json";
import ControllerImage from "@/components/controllerTags/ControllerImage";
import ControllerInput from "@/components/controllerTags/ControllerInput";
import ControllerSelect from "@/components/controllerTags/ControllerSelect";
import useSubmitNoDoubleClick from "@/hooks/useSubmitNoDoubleClick";

const dataPriceType = data.dataPriceType;

const FormActionCategory: React.FC<IPropFormActionCategory> = ({
  onSubmit,
  setValue,
  control,
  errors,
  handleSubmit,
  action,
  urlImageEdit,
}) => {
  const { onClickBack } = useFormActions();

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
            <Paper className="p-4 rounded-3xl flex justify-around flex-col items-center">
              <ControllerImage
                setValue={setValue}
                control={control}
                urlImageEdit={urlImageEdit}
                errors={errors}
              />
            </Paper>
          </div>
        </div>
        <Paper className="p-8 flex-[3] rounded-3xl">
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
