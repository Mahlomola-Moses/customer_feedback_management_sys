import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Authenticate if the user has logged in successfully using the token
export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    (req as any).adminId = (decoded as any).id;
    next();
  } catch (error) {
    res.status(401).json({ message: "Token is not valid" });
  }
};
