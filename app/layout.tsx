import "./globals.css"
import Topbar from "@/components/Topbar"
import Sidebar from "@/components/Sidebar"

export const metadata = { title: "SYNDAtools", description: "Launcher de apps Syndaverse" }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <Topbar />
        <div className="container-xl flex gap-6 py-6">
          <Sidebar />
          <main className="flex-1 min-w-0">{children}</main>
        </div>
      </body>
    </html>
  )
}
