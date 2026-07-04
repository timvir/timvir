import { NextResponse } from "next/server";

export async function GET() {
  await new Promise((resolve) => setTimeout(resolve, 5000));

  return new NextResponse(`<div style="height:200px;background:magenta">`, {
    status: 200,
    headers: {
      "Content-Type": "text/html",
    },
  });
}
