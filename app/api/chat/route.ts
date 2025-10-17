import { NextRequest, NextResponse } from "next/server";

const backend = process.env.NEXT_PUBLIC_BRAIN_API;

export async function POST(req: NextRequest) {
  if (!backend)
    return NextResponse.json({ ok: false, error: "BRAIN_API not set" }, { status: 500 });

  const body = await req.json();
  const res = await fetch(`${backend}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await res.text();
  return new NextResponse(data, { status: res.status, headers: res.headers });
}

export async function GET() {
  return NextResponse.json({
    ok: true,
    service: "SyndaTools proxy",
    backend,
  });
}
