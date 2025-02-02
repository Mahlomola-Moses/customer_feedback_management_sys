import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export class AuthMiddleware {
  // Authenticate if the user has logged in successfully using the token
  public async authenticate(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      res.status(401).json({ message: "No token, authorization denied" });
      return;
    }

    try {
      const decoded = jwt.verify(token, process.env.TOKEN_SECRET!);
      (req as any).adminId = (decoded as any).id;
      next();
    } catch (error) {
      res.status(401).json({ message: "Token is not valid" });
    }
  }

  public async accessControl(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const accessKey = req.header("access-key");

    if (!accessKey || accessKey !== process.env.API_ACCESS_KEY) {
      res.status(403).json({ message: "Access denied" });
      return;
    }
    next();
  }
}
