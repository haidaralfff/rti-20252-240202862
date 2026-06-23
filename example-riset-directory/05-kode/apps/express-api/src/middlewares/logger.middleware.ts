import { Request, Response, NextFunction } from "express";

/**
 * Request logger middleware – logs method, path, status, and duration.
 * No caching or Redis used (per project rules).
 */
export const requestLogger = (req: Request, res: Response, next: NextFunction): void => {
  const start = Date.now();
  res.on("finish", () => {
    const duration = Date.now() - start;
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path} ${res.statusCode} ${duration}ms`);
  });
  next();
};

/**
 * Global error handler middleware.
 */
export const errorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction): void => {
  console.error(err.stack);
  res.status(500).json({ error: "Unexpected internal server error" });
};
