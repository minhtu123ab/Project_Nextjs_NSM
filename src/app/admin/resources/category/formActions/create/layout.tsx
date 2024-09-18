import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Create Category",
  description: "Admin Create Category Documentation",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
