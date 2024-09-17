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
import Cookies from "js-cookie";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});

const Page = () => {
  const [loading, setLoading] = React.useState(false);

  const router = useRouter();
  const query = useSearchParams();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<{
    email: string;
    password: string;
  }>({
    resolver: yupResolver(schema),
    mode: "onTouched",
    defaultValues: { email: "", password: "" },
  });

  console.log(query.get("redirectTo"));
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
      router.push(query.get("redirectTo") || "/admin/resources/category");
    } catch (error) {
      console.log(error);
      toast.error("Login failed");
    } finally {
      setLoading(false);
      reset(
        {
          email: "",
          password: "",
        },
        { keepValues: false }
      );
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
              src={"/iconLogo.svg"}
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
              className="font-mono normal-case font-bold text-lg bg-cyan-400 text-zinc-800 mt-3"
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
