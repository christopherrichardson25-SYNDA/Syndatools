// app/page.tsx
import Link from "next/link";
import { detectLangFromSearch, t, type Lang, type SP } from "@/lib/lang";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<SP>;
}) {
  const sp = await searchParams;
  const lang: Lang = detectLangFromSearch(sp);
  const i = t(lang);

  return (
    <main className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold">{i.home.heroTitle}</h1>
      <p className="text-slate-600">{i.home.heroLead}</p>
      <Link href={`/tools?lang=${lang}`} className="btn btn-primary">
        {i.home.ctaTools}
      </Link>
    </main>
  );
}
