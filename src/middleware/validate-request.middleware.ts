import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";

export class ValidateRequestMiddleware {
  public validateRequest(schema: ObjectSchema) {
    return (req: Request, res: Response, next: NextFunction) => {
      const { error } = schema.validate(req.body, {
        abortEarly: false,
      });

      if (error) {
        res.status(400).json({
          message: "Validation error",
          errors: error.details.map((detail) => detail.message),
        });
        return;
      }

      next();
    };
  }
}
