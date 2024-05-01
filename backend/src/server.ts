import { AppDatabase } from "./config/mysql.database"
import { appDefaultRoute, appModuleRoute } from "./app.route"
import { createServer, Server as HttpServer } from 'http'
import { Server as SocketIoServer } from 'socket.io'
import { appEnvValidate } from "./app.config";

import cors from "cors"
import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import rateLimit from 'express-rate-limit'
import PrettyLogger from "./logger/PrettyLogger";
import config from 'config'
import ErrorMiddleware from "./error/ErrorMiddleware";


// app.exception

class Server {
  serverPort = Number(process.env.APP_PORT || 3000);
  app: express.Application;
  // env: dotenv.DotenvConfigOutput
  httpServer: HttpServer;
  io: SocketIoServer;
  // private readonly port: number = config.get<number>('server.port')
	private readonly env: string = config.get<string>('server.env')


  constructor() {
    this.app = express();
    this.httpServer = createServer(this.app);

    this.io = new SocketIoServer(this.httpServer, {
      pingTimeout: 60000,
      cors: {
        origin: ['*']
      }
    });

    //this.env = dotenv.config()

    this.initEnvironment();
    this.initMiddlewares();
    this.initRoutes();
    this.initSockets(); 
    this.initErrorHandling()
    this.unCaughtErrorHandler()
  }


  //ENVIROMENTAL VARIABLES
  initEnvironment() {
    appEnvValidate();
  }

  //EXTERNAL MIDDLEWARES
  initMiddlewares() {
    //helmet
    this.app.use(
      cors({
      origin: "http://localhost:5173",
      methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
      credentials: true
    }));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
    //----------------rate limiting-------------
    this.app.use(
      rateLimit({
        windowMs: 24 * 60 * 3, // next request to endpoint
        max: 5, // maximal request for all endpoint
        message: 'To many request, send back request after 3 minutes'
      })
    )
  }

  //GLOBAL ERROR HANDLER
  initErrorHandling() {
    this.app.use(ErrorMiddleware.globalErrorHandler); 
  }




  // UNCAUGHT ERROR HANDLER
   unCaughtErrorHandler(): void {
		process.on('uncaughtException', (err) => {
      console.log('----hit----')
			PrettyLogger.error(err, 'uncaught error handler')

			process.exit(1)
		})
	}
  

  //SERVER ROUTES
  initRoutes() {
    appModuleRoute(this.app);
    appDefaultRoute(this.app);
  }

  //WEBSOCKETS
  initSockets() {
    this.io.on('connection', (socket) => {
      console.log('A user connected');

      // Add your WebSocket event handlers here

      socket.on('disconnect', () => {
        console.log('User disconnected');
      });
    });
  }

  //INITIALIZED SERVER
  getServer() {
    return this.app;
  }

  //SERVER LISTENING
  serverListen() {
    return this.getServer().listen(Number(this.serverPort), async () => {
      new AppDatabase().openConnection();
      console.log(`App port : ${this.serverPort}`);
      // console.log(`App environment : ${process.env.ENV_NAME}`);
    });
  }

}

export default Server;
