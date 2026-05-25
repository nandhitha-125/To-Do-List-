import express from "express";
import corsMiddleware from "./middleware/cors";
import errorHandler from "./middleware/errorHandler";
import authMiddleware from "./middleware/auth";
import authRoutes from "./routes/auth.routes";
import todoRoutes from "./routes/todo.routes";

const app = express();

// Middleware
app.use(corsMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/todos", authMiddleware, todoRoutes);

// Health check
app.get("/api/health", (_req, res) => {
  res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
});

// Error handler (must be last)
app.use(errorHandler);

export default app;
