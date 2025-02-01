import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/User";

const JWT_SECRET: string =
  process.env.TOKEN_SECRET ||
  "e2b8f7a1c3d9e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9";
const JWT_EXPIRATION: string = process.env.TOKEN_SPAN || "1h";
export class AuthController {
  constructor() {}

  async login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !bcrypt.compareSync(password, user.password)) {
      res.status(401).send("Invalid credentials");
      return;
    }
    //revists to use env keys
    const token = jwt.sign(
      { id: user.id, email: user.email },
      "e2b8f7a1c3d9e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9",
      {
        expiresIn: "1h",
      }
    );

    res.json({ token });
  }
}
