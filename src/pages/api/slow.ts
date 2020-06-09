import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await new Promise((resolve) => setTimeout(resolve, 5000));

  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html");
  res.end(`<body style="margin:0"><div style="height:200px;background:magenta">`);
};
