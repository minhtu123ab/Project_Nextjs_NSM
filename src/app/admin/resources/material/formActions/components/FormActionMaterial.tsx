"use client";

import React from "react";
import { Button, Paper, CircularProgress } from "@mui/material";
import ControllerImage from "@/components/controllerTags/ControllerImage";
import ControllerInput from "@/components/controllerTags/ControllerInput";
import ControllerSelect from "@/components/controllerTags/ControllerSelect";
import useSubmitNoDoubleClick from "@/hooks/useSubmitNoDoubleClick";
import useFormActions from "../../hooks/useFormActions";
import withDataFetching from "@/HOC/withDataFetching";
import data from "@/app/admin/resources/material/data/data.json";
import { Replay } from "@mui/icons-material";

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
      <div className="flex justify-center items-center mt-60">
        <CircularProgress size={80} thickness={4.5} />
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center flex-col items-center mt-60">
        <Button
          variant="contained"
          color="primary"
          startIcon={<Replay />}
          onClick={fetchData}
          sx={{ mt: 2, fontSize: "1.25rem", padding: "0.75rem 1.5rem" }}
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
        <Paper sx={{ padding: "1.25rem", flex: 3, borderRadius: "1.5rem" }}>
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
                    data={item.data as IDataNameID[]}
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
                sx={{ textTransform: "none", width: "6rem" }}
                variant="outlined"
                onClick={onClickBack}
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

export default withDataFetching(FormActionMaterial, urls);
