import Link from "next/link"

const items = [
  { href: "/tools", label: "Apps" },
  { href: "/about", label: "Acerca de" },
]

export default function Sidebar() {
  return (
    <aside className="hidden md:block w-64 border-r border-sv-border bg-white">
      <nav className="p-4 space-y-1">
        {items.map(it => (
          <Link key={it.href} href={it.href}
            className="block rounded-lg px-3 py-2 text-sm hover:bg-sv-bg">
            {it.label}
          </Link>
        ))}
      </nav>
    </aside>
  )
}
