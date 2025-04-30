import { ITask } from "../interfaces/Task";
import { VercelRequest, VercelResponse } from "@vercel/node";

let tasks: ITask[] = [
  {
    id: 1,
    title: "Task 1",
    description: "Description 1",
    status: "pending",
  },
  {
    id: 2,
    title: "Task 2",
    description: "Description 2",
    status: "pending",
  },
  {
    id: 3,
    title: "Task 3",
    description: "Description 3",
    status: "pending",
  },
];

export const getTasks = (req: VercelRequest, res: VercelResponse) => {
  res.json(tasks);
};
export const getTask = (req: VercelRequest, res: VercelResponse) => {
  const task = tasks.find((t) => t.id === parseInt(req.query.id as string));
  task ? res.json(task) : res.status(404).json({ message: "Task not found" });
};

export const createTask = (req: VercelRequest, res: VercelResponse) => {
  const newTask: ITask = { id: Date.now(), ...req.body };
  tasks.push(newTask);
  res.status(201).json(newTask);
};

export const updateTask = (req: VercelRequest, res: VercelResponse) => {
  const index = tasks.findIndex(
    (t) => t.id === parseInt(req.query.id as string)
  );
  if (index !== -1) {
    tasks[index] = { ...tasks[index], ...req.body };
    res.json(tasks[index]);
  } else {
    res.status(404).json({ message: "Task not found" });
  }
};

export const deleteTask = (req: VercelRequest, res: VercelResponse) => {
  tasks = tasks.filter((t) => t.id !== parseInt(req.query.id as string));
  res.status(204).json({ message: "Task deleted" });
};
