import { NextApiRequest, NextApiResponse } from "next";
import { unfurl } from "unfurl.js";
import Cors from "cors";

const cors = Cors({
  methods: ["GET", "HEAD"],
});

function runMiddleware(req: NextApiRequest, res: NextApiResponse, fn: any) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await runMiddleware(req, res, cors);

  if (typeof req.query.url !== "string") {
    res.statusCode = 400;
    res.end();
    return;
  }

  try {
    res.statusCode = 200;
    const metadata = await unfurl(req.query.url);
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(metadata));
  } catch {
    res.statusCode = 500;
    res.end();
  }
};
