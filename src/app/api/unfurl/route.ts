import { NextResponse } from "next/server";
import { unfurl } from "unfurl.js";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");

  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, HEAD, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  if (!url) {
    return new NextResponse(null, { status: 400, headers: corsHeaders });
  }

  try {
    const metadata = await unfurl(url);
    return NextResponse.json(metadata, { headers: corsHeaders });
  } catch {
    return new NextResponse(null, { status: 500, headers: corsHeaders });
  }
}

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, HEAD, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
