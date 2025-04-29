import express from "express";

import {
  getTask,
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/taskController";

const router = express.Router();

router.get("/tasks", getTasks);
router.get("/tasks/:id", getTask);
router.post("/tasks", createTask);
router.put("/tasks/:id", updateTask);
router.delete("/tasks/:id", deleteTask);

export default router;
