import { Request, Response, NextFunction } from "express";

// Mock authentication middleware
export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // Get token from header
  const token = req.headers.authorization?.split(" ")[1];

  // For demo purposes, we'll just check if a token exists
  if (!token) {
    return res.status(401).json({ error: "Authentication required" });
  }

  // In a real implementation, you would verify the token
  // and attach the user information to the request

  // Mock user for demo
  (req as any).user = {
    id: "user123",
    email: "user@example.com",
    role: "user",
  };

  next();
};

// Admin authorization middleware
export const adminMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const user = (req as any).user;

  if (!user || user.role !== "admin") {
    return res.status(403).json({ error: "Admin access required" });
  }

  next();
};
