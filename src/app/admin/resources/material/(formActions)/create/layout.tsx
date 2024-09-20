import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Create Material",
  description: "Admin Create Material Documentation",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
