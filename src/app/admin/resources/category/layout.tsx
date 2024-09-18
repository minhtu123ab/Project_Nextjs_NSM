import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Category",
  description: "Admin Category Documentation",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
