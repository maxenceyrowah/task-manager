import { VercelRequest, VercelResponse } from "@vercel/node";
import {
  deleteTask,
  getTask,
  updateTask,
} from "../../src/controllers/taskController";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  switch (req.method) {
    case "GET":
      try {
        const task: any = getTask(req, res);
        if (!task) {
          return res.status(404).json({ error: "Task not found" });
        }
        res.status(200).json(task);
      } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
      }
      break;

    case "PUT":
      try {
        const updatedTask = await updateTask(req, res);
        res.status(200).json(updatedTask);
      } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
      }
      break;

    case "DELETE":
      try {
        await deleteTask(req, res);
        res.status(204).end();
      } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
