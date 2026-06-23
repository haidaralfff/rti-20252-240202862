import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.routes";
import { requestLogger, errorHandler } from "./middlewares/logger.middleware";

const app = express();

// ─── Middleware ────────────────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());
app.use(requestLogger);

// ─── Routes ───────────────────────────────────────────────────────────────────
app.use("/api", userRoutes);

// Health check
app.get("/health", (_req, res) => {
  res.json({ status: "ok", framework: "express", timestamp: new Date().toISOString() });
});

// ─── Error Handler ────────────────────────────────────────────────────────────
app.use(errorHandler);

// ─── Start Server ─────────────────────────────────────────────────────────────
const PORT = parseInt(process.env.PORT || "3000", 10);
app.listen(PORT, "0.0.0.0", () => {
  console.log(`[Express] API listening on port ${PORT}`);
});

export default app;
