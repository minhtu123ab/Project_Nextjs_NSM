import { Paper, CircularProgress } from "@mui/material";
import Image from "next/image";
import React, { Suspense } from "react";
import FormLogin from "./components/FormLogin";

const Page: React.FC = () => {
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
          <Suspense
            fallback={
              <div className="flex justify-center">
                <CircularProgress size={80} />
              </div>
            }
          >
            <FormLogin />
          </Suspense>
        </div>
      </Paper>
    </div>
  );
};

export default Page;
