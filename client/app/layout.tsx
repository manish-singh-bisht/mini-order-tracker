import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "order status",
  description: "mini order status app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
