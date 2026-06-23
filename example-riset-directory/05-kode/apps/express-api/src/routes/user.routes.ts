import { Router } from "express";
import { UserController } from "../controllers/user.controller";

const router = Router();

// Scenario 1 – Simple (no DB)
router.get("/simple", UserController.simpleGet);

// Scenario 3 – Complex aggregation (must be before /:id to avoid route collision)
router.get("/users/stats", UserController.getStats);

// Scenario 2 – Single DB read
router.get("/users/:id", UserController.getById);

// Scenario 4 – Create user
router.post("/users", UserController.create);

// Scenario 5 – Update user
router.put("/users/:id", UserController.update);

// Scenario 6 – Delete user
router.delete("/users/:id", UserController.remove);

export default router;
