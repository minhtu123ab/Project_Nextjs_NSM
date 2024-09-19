"use client";

import { Button, CircularProgress, Paper, TextField } from "@mui/material";
import Image from "next/image";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});

const Page: React.FC = () => {
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
      localStorage.setItem("token", JSON.stringify(token));

      toast.success("Login successful");
      router.push(redirectTo);
      console.log(redirectTo);
    } catch (error) {
      console.error(error);
      toast.error("Login failed. Please check your credentials and try again.");
    } finally {
      setLoading(false);
      reset();
    }
  };

  return (
    <div className="flex items-center justify-center px-36 w-screen h-screen bg-gray-200">
      <Paper className="flex font-mono rounded-2xl overflow-hidden shadow-2xl">
        <div className="flex-[3] rounded-e-full bg-cyan-400 flex flex-col justify-center items-center text-white">
          <h1 className="text-5xl font-bold mb-4">Welcome Back!</h1>
          <p className="text-lg px-12 text-center">
            <span className="font-bold">Laravel Nova:</span> Simplifying your
            admin experience. Log in to continue managing with ease.
          </p>
        </div>
        <div className="flex-[2] items-center py-32">
          <div className="flex flex-col items-center gap-3">
            <Image
              src="/iconLogo.svg"
              className="w-auto h-[70px]"
              width={70}
              height={20}
              alt="iconLogo"
            />
            <h1 className="text-4xl font-bold mb-3">Login</h1>
          </div>
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
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
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
        </div>
      </Paper>
    </div>
  );
};

export default Page;
