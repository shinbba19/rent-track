import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rent Track — Owner Portal",
  description: "Condo Owner Rent Monitoring Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
