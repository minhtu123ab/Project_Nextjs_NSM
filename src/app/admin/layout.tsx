import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import { Container } from "@mui/material";

export const metadata: Metadata = {
  title: "Admin",
  description: "Admin Documentation",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <div className="bg-[#F0F4F8] min-h-screen pt-20">
      <Navbar />
      <Container>{children}</Container>
    </div>
  );
}
