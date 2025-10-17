import Link from "next/link";
import APPS from "@/app/_data/apps";
import { detectLangFromSearch, t, type Lang } from "@/lib/lang";

export default async function ToolsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const lang: Lang = detectLangFromSearch(sp);
  const dict = t(lang);
  const qs = new URLSearchParams(sp as Record<string, string>).toString();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">{dict.toolsTitle}</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {APPS.map((a) => (
          <div key={a.key} className="card p-5">
            <div className="flex items-center gap-3">
              {a.icon ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={a.icon} alt={a.name[lang]} width={32} height={32} />
              ) : (
                <div className="size-8 rounded-lg bg-sv-primary" />
              )}
              <h3 className="text-lg font-semibold">{a.name[lang]}</h3>
              <span className={`ml-auto badge-${a.online ? "online" : "offline"}`}>
                {a.online ? "Online" : "Offline"}
              </span>
            </div>
            <p className="text-sm text-sv-muted mt-2">{a.description[lang]}</p>
            <div className="mt-4">
              {a.soon ? (
                <button className="btn btn-ghost opacity-60 cursor-not-allowed">
                  {dict.cardSoon}
                </button>
              ) : (
                <Link href={`${a.href}?${qs}`} className="btn btn-primary">
                  {dict.cardOpen}
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
