export default function Topbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-sv-border bg-white/80 backdrop-blur">
      <div className="container-xl flex h-14 items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="size-6 rounded-md bg-sv-primary" />
          <span className="font-semibold">Syndaverse</span>
          <span className="text-sv-muted">/ SYNDATools</span>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <a href="/tools" className="btn btn-ghost">Catálogo</a>
          {/* espacio para usuario / settings */}
        </div>
      </div>
    </header>
  );
}
