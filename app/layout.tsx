// app/layout.tsx
import "./globals.css";
import Topbar from "@/components/Topbar";
import Sidebar from "@/components/Sidebar";
import { detectLangFromSearch, type Lang } from "@/lib/lang";

export const metadata = {
  title: "SYNDATools",
  description: "Launcher de apps Syndaverse",
};

export default async function RootLayout({
  children,
  searchParams,
}: {
  children: React.ReactNode;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const lang: Lang = detectLangFromSearch(sp);

  return (
    <html lang={lang}>
      <body className="min-h-screen">
        <Topbar lang={lang} />
        <div className="container-xl flex gap-6 py-6">
          <Sidebar lang={lang} />
          <main className="flex-1 min-w-0">{children}</main>
        </div>
      </body>
    </html>
  );
}
