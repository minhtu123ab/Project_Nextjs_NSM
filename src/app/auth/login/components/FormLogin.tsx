"use client";

import { Button, CircularProgress, TextField } from "@mui/material";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});

const FormLogin = () => {
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  const query = useSearchParams();

  const redirectTo = query.get("redirectTo") || "/admin/resources/category";

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IDataLogin>({
    resolver: yupResolver(schema),
    mode: "onTouched",
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data: IDataLogin) => {
    try {
      setLoading(true);
      const response = await axios.post(
        process.env.NEXT_PUBLIC_URL_SERVER + "/auth/login",
        data
      );

      const token: { access: string; refresh: string; id: string } =
        response.data;
      localStorage.setItem("token", token.access);
      Cookies.set("token", token.refresh, {
        expires: 30 / 1440,
      });

      toast.success("Login successful");
      router.push(redirectTo);
    } catch (error) {
      console.error(error);
      toast.error("Login failed. Please check your credentials and try again.");
    } finally {
      setLoading(false);
      reset();
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col px-20 gap-5"
    >
      <div className="flex flex-col">
        <label htmlFor="email">
          Email<span className="text-red-500">*</span>:
        </label>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              type="email"
              id="email"
              name="email"
              size="small"
            />
          )}
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      </div>
      <div className="flex flex-col">
        <label htmlFor="password">
          Password<span className="text-red-500">*</span>:
        </label>
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              type="password"
              id="password"
              name="password"
              size="small"
            />
          )}
        />
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}
      </div>
      <Button
        sx={{
          fontFamily: "monospace",
          textTransform: "none",
          fontWeight: "bold",
          fontSize: "1.125rem",
          backgroundColor: "#22D3EE",
          color: "#f8f9fa",
          marginTop: "0.75rem",
        }}
        type="submit"
        disabled={loading}
        endIcon={loading && <CircularProgress size={24} />}
      >
        Submit
      </Button>
    </form>
  );
};

export default FormLogin;
