export default function Home() {
  return (
    <div className="space-y-6">
      <div className="card p-8">
        <h1 className="text-2xl font-bold">Bienvenido a SYNDAtools</h1>
        <p className="text-sv-muted mt-2">Launcher de aplicaciones del ecosistema Syndaverse.</p>
        <div className="mt-4">
          <a href="/tools" className="btn btn-primary">Ir al catálogo</a>
        </div>
      </div>
    </div>
  )
}
