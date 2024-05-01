import { Request, Response } from "express";
import { SuccessOk } from "../../shared/response/success/success.response";
import PrettyLogger from "../../logger/PrettyLogger";

import EventEmitter from "events"

class MyEmitter extends EventEmitter {}


const myEmitter = new MyEmitter();

class HealthCheckController {
    getHealth = (request: Request, response: Response): void => {

      console.log('hit')
      // try{


       throw new Error("test error")

        // SuccessOk(response, { status: "healthy" });
      // } catch(err){
      //   PrettyLogger.error(err, 'Pretty logger error')

      // }
    };
  }
  
  export { HealthCheckController };