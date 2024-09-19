import Navbar from "@/components/layout/Navbar";
import { Container } from "@mui/material";

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
