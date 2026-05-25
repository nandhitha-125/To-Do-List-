import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";

export const metadata: Metadata = {
  title: "Todo App — Stay Organized",
  description:
    "A sleek, modern todo application to manage your tasks efficiently. Built with Next.js and Express.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="app-background" />
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
