import { VercelRequest, VercelResponse } from "@vercel/node";

import { getTasks } from "../../src/controllers/taskController";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === "GET") {
    try {
      const tasks = getTasks(req, res);
      res.status(200).json(tasks);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
