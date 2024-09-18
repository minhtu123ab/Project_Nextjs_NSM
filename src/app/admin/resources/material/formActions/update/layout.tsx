import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Update Material",
  description: "Admin Update Material Documentation",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
