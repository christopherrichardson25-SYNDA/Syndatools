import AppCard from "@/components/AppCard"
import { APPS } from "@/app/_data/apps"

async function ping(url: string) {
  try {
    const r = await fetch(url, { cache: "no-store" })
    return r.ok
  } catch { return false }
}

export default async function ToolsPage() {
  const statuses = await Promise.all(
    APPS.map(a => a.healthPath ? ping(a.url + a.healthPath) : Promise.resolve(true))
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Catálogo de apps</h1>
        <p className="text-sv-muted">Lanza las aplicaciones. Cada app se conecta a SYNDAbrain de forma directa.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {APPS.map((a, i) => (
          <AppCard
            key={a.id}
            name={a.name}
            description={a.description}
            icon={a.icon}
            href={a.url}
            soon={a.soon}
            online={statuses[i]}
          />
        ))}
      </div>
    </div>
  )
}
