import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch(
      "https://backend.digantara.dev/v1/satellites?attributes=noradCatId,intlDes,name,launchDate,objectType,orbitCode,countryCode"
    );

    if (!res.ok) {
      return NextResponse.json({ error: "Failed to fetch" }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch  {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
