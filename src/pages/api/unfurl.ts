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

  try {
    res.statusCode = 200;
    const metadata = await unfurl(req.query.url as string);
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(metadata));
  } catch (err) {
    res.statusCode = 500;
    res.end(JSON.stringify(err));
  }
};
