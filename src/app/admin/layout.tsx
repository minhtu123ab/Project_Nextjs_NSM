"use client";

import Navbar from "@/components/layout/Navbar";
import { Container } from "@mui/material";
import { useRouter } from "next/navigation";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();

  const token = localStorage.getItem("token");
  if (!token) {
    router.replace("/auth/login");
    return null;
  }

  return (
    <div className="bg-[#F0F4F8] min-h-screen pt-20">
      <Navbar />
      <Container>{children}</Container>
    </div>
  );
}
