import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description: "Login Documentation",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="bg-[#F0F4F8] min-h-screen">{children}</div>;
}
