// app/tools/page.tsx
import Link from "next/link";
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
  const chatHref = `/lets-chat?${qs}`;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">{dict.toolsTitle}</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <div className="card p-5">
          <h3 className="text-lg font-semibold">{dict.cardChatTitle}</h3>
          <p className="text-sm text-sv-muted mt-2">{dict.cardChatDesc}</p>
          <div className="mt-4">
            <Link href={chatHref} className="btn btn-primary">
              {dict.open}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
