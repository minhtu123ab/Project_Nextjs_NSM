"use client";

import React from "react";
import { Button, Paper, CircularProgress, IconButton } from "@mui/material";
import ControllerImage from "@/components/controllerTags/ControllerImage";
import ControllerInput from "@/components/controllerTags/ControllerInput";
import ControllerSelect from "@/components/controllerTags/ControllerSelect";
import useSubmitNoDoubleClick from "@/hooks/useSubmitNoDoubleClick";
import useFormActions from "../../hooks/useFormActions";
import withDataFetching from "@/HOC/withDataFetching";
import data from "@/app/admin/resources/material/data/data.json";
import { Cached, Replay } from "@mui/icons-material";

const urls = data.urls;
const dataControllerInputLeft = data.dataControllerInputLeft;
const dataControllerInputRight = data.dataControllerInputRight;
const dataControllerSelect = data.dataControllerSelect;

const FormActionMaterial: React.FC<
  IPropFormActionMaterial<IDataSubmitMaterial>
> = ({
  onSubmit,
  setValue,
  control,
  errors,
  handleSubmit,
  action,
  urlImageEdit,
  state,
  fetchData,
}) => {
  const { onClickBack } = useFormActions();

  const { handleSubmitAddFormData, loading } =
    useSubmitNoDoubleClick<IDataSubmitMaterial>(onSubmit);

  const { data, loadingHoc, error } = state || {};

  if (loadingHoc)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <CircularProgress size={80} thickness={4.5} /> {/* Loading icon lớn */}
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center flex-col items-center h-screen">
        <IconButton onClick={fetchData} color="primary" size="large">
          <Cached fontSize="large" /> {/* Nút reload có icon lớn */}
        </IconButton>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Replay />}
          onClick={fetchData}
          sx={{ mt: 2, fontSize: "1.25rem", padding: "0.75rem 1.5rem" }} // Button lớn hơn với padding
        >
          Reload
        </Button>
      </div>
    );

  const dataControllerSelectRender = dataControllerSelect.map(
    (item, index) => ({ ...item, data: data?.[urls[index]] ?? [] })
  );

  return (
    <div className="p-5">
      <h1 className="text-center text-4xl text-gray-500">{action} Material</h1>
      <form
        onSubmit={handleSubmit(handleSubmitAddFormData)}
        className="flex justify-center px-5 py-7 gap-5"
      >
        <div className="flex-[1] flex justify-center">
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
        <Paper className="p-5 flex-[3] rounded-3xl">
          <div>
            <div className="flex gap-5">
              <div className="flex flex-[1] flex-col gap-3">
                {dataControllerInputLeft.map((item, index) => (
                  <ControllerInput
                    key={index}
                    control={control}
                    errors={errors}
                    label={item.label}
                    name={item.name}
                    required={item.require}
                    type={item.type}
                  />
                ))}
              </div>
              <div className="flex flex-[1] flex-col gap-3">
                {dataControllerInputRight.map((item, index) => (
                  <ControllerInput
                    key={index}
                    control={control}
                    errors={errors}
                    label={item.label}
                    name={item.name}
                    required={item.require}
                    type={item.type}
                  />
                ))}
                {dataControllerSelectRender.map((item, index) => (
                  <ControllerSelect
                    key={index}
                    control={control}
                    data={item.data as IDataControllerSelect[]}
                    errors={errors}
                    label={item.label}
                    name={item.name}
                    required={true}
                    type="select"
                  />
                ))}
              </div>
            </div>

            <div className="flex justify-around mt-5">
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

export default withDataFetching(FormActionMaterial, urls);
