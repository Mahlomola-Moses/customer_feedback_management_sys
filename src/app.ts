// Import necessary modules
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

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

    // Use the router for handling routes
    this.app.use(this.appRouter);

    // Return the configured Express application instance
    return this.app;
  }
}
