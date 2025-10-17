// app/page.tsx
import Link from "next/link";
import { detectLangFromSearch, t, type Lang } from "@/lib/lang";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const lang: Lang = detectLangFromSearch(sp);
  const dict = t(lang);

  const qs = new URLSearchParams(sp as Record<string, string>).toString();
  const toolsHref = `/tools?${qs}`;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">{dict.homeTitle}</h1>
      <p className="text-sv-muted mt-2">{dict.homeLead}</p>
      <div className="mt-4">
        <Link href={toolsHref} className="btn btn-primary">
          {dict.goCatalog}
        </Link>
      </div>
    </div>
  );
}
