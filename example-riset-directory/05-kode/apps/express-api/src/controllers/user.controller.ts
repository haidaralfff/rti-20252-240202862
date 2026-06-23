import { Request, Response } from "express";
import { UserService } from "../services/user.service";

export const UserController = {
  // Scenario 1: Simple endpoint – no DB query
  simpleGet: (_req: Request, res: Response): void => {
    res.json({ timestamp: new Date().toISOString() });
  },

  // Scenario 2: Single DB read
  getById: async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      res.status(400).json({ error: "Invalid user ID format" });
      return;
    }
    try {
      const user = await UserService.findById(id);
      if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
      }
      res.json(user);
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  // Scenario 3: Complex aggregation query
  getStats: async (_req: Request, res: Response): Promise<void> => {
    try {
      const stats = await UserService.getStats();
      res.json(stats);
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  // Scenario 4: Create operation
  create: async (req: Request, res: Response): Promise<void> => {
    const { name, email, phone } = req.body;
    if (!name || !email) {
      res.status(400).json({ error: "Missing required fields: name, email" });
      return;
    }
    try {
      const user = await UserService.create(name, email, phone);
      res.status(201).json(user);
    } catch (e: any) {
      if (e.code === "23505") {
        res.status(409).json({ error: "Email already exists" });
      } else {
        console.error(e);
        res.status(500).json({ error: "Internal server error" });
      }
    }
  },

  // Scenario 5: Update operation
  update: async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      res.status(400).json({ error: "Invalid user ID format" });
      return;
    }
    const { name, email, phone } = req.body;
    if (!name || !email) {
      res.status(400).json({ error: "Missing required fields: name, email" });
      return;
    }
    try {
      const user = await UserService.update(id, name, email, phone);
      if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
      }
      res.json(user);
    } catch (e: any) {
      if (e.code === "23505") {
        res.status(409).json({ error: "Email already exists" });
      } else {
        console.error(e);
        res.status(500).json({ error: "Internal server error" });
      }
    }
  },

  // Scenario 6: Delete operation
  remove: async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      res.status(400).json({ error: "Invalid user ID format" });
      return;
    }
    try {
      const user = await UserService.delete(id);
      if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
      }
      res.status(204).send();
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "Internal server error" });
    }
  },
};
