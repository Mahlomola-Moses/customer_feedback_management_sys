// Import necessary modules and configs
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import swaggerOptions from "./configs/swagger.config";

// Import application routes
import { AdminRoutes } from "./routes/admin.route";
import mongoose from "mongoose";
import { authRoutes } from "./routes/auth.route";
import { FeedbackRoutes } from "./routes/feedback.route";
import { AuthMiddleware } from "./middleware/auth.middleware";

export class App {
  public app: express.Application;

  private appRouter: express.Router;

  // Constructor to initialise the Express app and router
  constructor() {
    // Create an instance of the Express application
    this.app = express();

    // Create an instance of the Express router
    this.appRouter = express.Router();

    // Initialise middleware and other configurations
    this.initialise();
  }

  // Method to initialise middleware and setup the app
  public async initialise(): Promise<express.Application> {
    // Enable CORS (Cross-Origin Resource Sharing) for all routes
    this.app.use(cors());

    // Parse incoming JSON requests and make the data available under req.body
    this.app.use(bodyParser.json());

    // Apply the access key middleware globally
    this.app.use(new AuthMiddleware().accessControl);

    //setup swagger
    const swaggerSpec = swaggerJsdoc(swaggerOptions);
    this.app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    //db connections

    mongoose
      .connect(process.env.MONGO_URI!)
      .then(() => {
        console.log("Connected to MongoDB");
      })
      .catch((error) => {
        console.error("Error connecting to MongoDB", error, process.env.PORT);
      });

    //regiter application routes
    new authRoutes(this.appRouter);
    new AdminRoutes(this.appRouter);
    new FeedbackRoutes(this.appRouter);

    // Use the router for handling routes
    this.app.use(this.appRouter);

    // Return the configured Express application instance
    return this.app;
  }
}
