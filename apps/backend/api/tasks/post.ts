import { VercelRequest, VercelResponse } from "@vercel/node";

import { createTask } from "../../src/controllers/taskController";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === "POST") {
    try {
      const newTask = createTask(req, res);
      res.status(201).json(newTask);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
