import type { NextApiRequest, NextApiResponse } from "next";

export default async (_req: NextApiRequest, res: NextApiResponse) => {
  await new Promise((resolve) => setTimeout(resolve, 5000));

  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html");
  res.end(`<div style="height:200px;background:magenta">`);
};
