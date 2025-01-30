// Import the necessary modules
import http from "http";
import { App } from "./app";

export class Server {
  // Private properties to store the HTTP server instance and the port number
  private servcer: http.Server;
  private port: number | string;

  // Constructor to initialise the server with an HTTP request listener (app)
  constructor(app: http.RequestListener) {
    // Create an HTTP server using the provided request listener
    this.servcer = http.createServer(app);
    // Set the port from environment variables or default to 35050
    this.port = process.env.PORT || 35050;
  }

  // Method to start the server
  public async startServer(): Promise<void> {
    this.servcer.listen(this.port, () => {
      console.log("Server is running on port " + this.port);
    });
  }
}

// Create an instance of the Server class with a new App instance
const server = new Server(new App().app);

// Start the server
server.startServer();
