export default function Home() {
  return (
    <section className="space-y-6">
      <div className="card p-8">
        <h1 className="text-2xl font-bold">Bienvenido a SYNDATools</h1>
        <p className="text-sv-muted mt-2">
          Launcher de aplicaciones del ecosistema <strong>Syndaverse</strong>.
          Cada app se conecta con <strong>SyndaBrain</strong> para asistencia e
          interacción inteligente.
        </p>

        <div className="mt-6 flex gap-3">
          <a href="/tools" className="btn btn-primary">
            Ir al catálogo
          </a>
          <a href="/lets-chat" className="btn btn-ghost">
            Chat con SyndaBrain
          </a>
        </div>
      </div>
    </section>
  );
}
