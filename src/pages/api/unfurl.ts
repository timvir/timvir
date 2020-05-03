import { NextApiRequest, NextApiResponse } from "next";
import { unfurl } from "unfurl.js";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    res.statusCode = 200;
    const metadata = await unfurl(req.query.url);
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(metadata));
  } catch (err) {
    res.statusCode = 500;
    res.end(JSON.stringify(err));
  }
};
