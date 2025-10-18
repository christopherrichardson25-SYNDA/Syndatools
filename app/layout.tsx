import "./globals.css";
import { Suspense } from "react";
import Topbar from "@/components/Topbar";
import Sidebar from "@/components/Sidebar";

export const metadata = {
  title: "SYNDATools",
  description: "Launcher de apps Syndaverse",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="min-h-screen">
        <Suspense><Topbar /></Suspense>
        <div className="container-xl flex gap-6 py-6">
          <Suspense><Sidebar /></Suspense>
          <main className="flex-1 min-w-0">{children}</main>
        </div>
      </body>
    </html>
  );
}
