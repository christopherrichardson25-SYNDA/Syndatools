import Image from "next/image";
import Link from "next/link";

export default function AppCard({
  name,
  description,
  icon,
  href,
  online,
  soon,
}: {
  name: string;
  description: string;
  icon?: string;
  href: string;
  online?: boolean;
  soon?: boolean;
}) {
  return (
    <div className="card p-5">
      <div className="flex items-center gap-3">
        {icon && <Image src={icon} alt={name} width={32} height={32} className="rounded-lg" />}
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
          <Link href={href} target="_blank" rel="noopener" className="btn btn-primary">
            Abrir
          </Link>
        )}
      </div>
    </div>
  );
}
