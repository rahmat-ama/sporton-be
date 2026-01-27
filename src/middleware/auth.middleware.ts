import { Request, Response, NextFunction } from "express";
import JWT from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "sporton123";

export interface AuthRequest extends Request {
  user?: any;
}

export const authenticate = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): void => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    res.status(401).json({ message: "Authentication required!" });
    return;
  }

  try {
    const decoded = JWT.verify(token, JWT_SECRET);
    req.user = decoded;

    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Invalid token" });
  }
};
