import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Update Category",
  description: "Admin Update Category Documentation",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
