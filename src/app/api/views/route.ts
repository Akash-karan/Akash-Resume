import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const COUNTER_KEY = "akash-karan-portfolio-views";

async function getIncrementedViews(): Promise<number> {
  // Option 1: Upstash Redis if env vars exist
  const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
  const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (redisUrl && redisToken) {
    try {
      const res = await fetch(`${redisUrl}/incr/${COUNTER_KEY}`, {
        headers: {
          Authorization: `Bearer ${redisToken}`,
        },
        cache: "no-store",
      });
      if (res.ok) {
        const data = await res.json();
        if (typeof data.result === "number") {
          return data.result;
        }
      }
    } catch (err) {
      console.error("Upstash counter error:", err);
    }
  }

  // Option 2: Global persistent counter API service
  try {
    const res = await fetch(
      `https://countapi.mileshilliard.com/api/v1/hit/${COUNTER_KEY}`,
      { cache: "no-store" }
    );
    if (res.ok) {
      const data = await res.json();
      if (typeof data.value === "number") {
        return data.value;
      }
    }
  } catch (err) {
    console.error("Global counter API error:", err);
  }

  // Fallback fallback default
  return 100;
}

export async function GET() {
  const views = await getIncrementedViews();
  return NextResponse.json({ views });
}

export async function POST() {
  const views = await getIncrementedViews();
  return NextResponse.json({ views });
}
