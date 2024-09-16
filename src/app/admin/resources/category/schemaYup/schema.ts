import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  price_type: yup.string().required("Price Type is required"),
  image: yup
    .mixed<File[] | string>()
    .required("Image is required")
    .test("Image", "Image is required", (value) => value.length > 0),
});

export default schema;
