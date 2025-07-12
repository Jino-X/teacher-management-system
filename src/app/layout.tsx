import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";

import QueryProvider from "../provider/query-provider";
import { TOAST_STYLES } from "@/constants/style";

import "./globals.css";

export const metadata: Metadata = {
  title: "TeacherMS - Teacher Management System",
  description:
    "A comprehensive platform for managing teachers, schedules, and educational resources.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
      </head>
      <body>
        <QueryProvider>{children}</QueryProvider>
        <Toaster position="top-right" toastOptions={TOAST_STYLES} />
      </body>
    </html>
  );
}
