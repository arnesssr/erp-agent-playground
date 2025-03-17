import express from "express";
import cors from "cors";
import { config } from "./config";
import routes from "./routes";

// Create Express server
const app = express();

// Middleware
app.use(cors(config.cors));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use(routes);

// Error handling middleware
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    console.error(err.stack);
    res.status(500).json({
      error: "Internal Server Error",
      message: err.message,
    });
  },
);

// Start server
app.listen(config.port, () => {
  console.log(
    `Server running on port ${config.port} in ${config.environment} mode`,
  );
});

export default app;
