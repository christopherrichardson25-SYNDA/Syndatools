import AppCard from "@/components/AppCard";
import { APPS } from "@/lib/apps";

async function ping(url: string): Promise<boolean> {
  try {
    const r = await fetch(url, { cache: "no-store", next: { revalidate: 0 } });
    return r.ok;
  } catch {
    return false;
  }
}

export default async function ToolsPage() {
  const statuses = await Promise.all(
    APPS.map(async (app) => ({
      ...app,
      online: app.href.startsWith("http") ? await ping(app.href) : app.online,
    }))
  );

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Catálogo de apps</h1>
        <p className="text-sv-muted mt-2">
          Explora las aplicaciones conectadas al ecosistema Syndaverse. Cada app
          puede integrarse con <strong>SyndaBrain</strong> para potenciar sus
          funciones.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {statuses.map((app) => (
          <AppCard
            key={app.key}
            name={app.name}
            description={app.description}
            icon={app.icon}
            href={app.href}
            online={app.online}
            soon={app.soon}
          />
        ))}
      </div>
    </section>
  );
}
