// Backend configuration
export const config = {
  port: process.env.PORT || 3001,
  environment: process.env.NODE_ENV || "development",
  apiKeys: {
    openai: process.env.OPENAI_API_KEY,
  },
  database: {
    url: process.env.DATABASE_URL || "sqlite::memory:",
  },
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  },
};
