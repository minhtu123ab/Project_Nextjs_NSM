import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Material",
  description: "Admin Material Documentation",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
