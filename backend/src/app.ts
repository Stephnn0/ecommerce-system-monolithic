import Server from "./server";

// Use the server instance directly
const serverInstance = new Server();

// Create the HTTP server
export const httpServer = serverInstance.getServer();


// Start the server
(async () => serverInstance.serverListen())();