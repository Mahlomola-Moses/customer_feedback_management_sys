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
      //revistes for env key (-?-)
      const decoded = jwt.verify(
        token,
        "e2b8f7a1c3d9e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9"
      );
      (req as any).adminId = (decoded as any).id;
      next();
    } catch (error) {
      res.status(401).json({ message: "Token is not valid" });
    }
  }
}
