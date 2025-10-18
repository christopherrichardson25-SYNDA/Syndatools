import Image from "next/image";
import Link from "next/link";

export default function AppCard({
  name, description, icon, href, online, soon,
}: {
  name: string;
  description: string;
  icon?: string;            // URL a /public/icons/*
  href: string;
  online?: boolean;
  soon?: boolean;
}) {
  const initials = name.split(" ").map(s => s[0]).join("").slice(0,2).toUpperCase();

  return (
    <div className="card p-5">
      <div className="flex items-center gap-3">
        {icon ? (
          <Image src={icon} alt={name} width={36} height={36} className="rounded-lg" />
        ) : (
          <div className="h-9 w-9 rounded-lg bg-blue-600 text-white grid place-items-center font-semibold">
            {initials}
          </div>
        )}
        <h3 className="text-lg font-semibold">{name}</h3>
        <span className={`ml-auto badge ${online ? "badge-online" : "badge-offline"}`}>
          {online ? "Online" : "Offline"}
        </span>
      </div>

      <p className="mt-2 text-sm text-sv-muted">{description}</p>

      <div className="mt-4">
        {soon ? (
          <button className="btn btn-ghost opacity-60 cursor-not-allowed">Próximamente</button>
        ) : (
          <Link href={href} className="btn btn-primary">Abrir</Link>
        )}
      </div>
    </div>
  );
}
