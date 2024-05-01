import { Router } from "express";
import { StripeController } from "./stripe";
import bodyParser from "body-parser";




class StripeRoute {
    path = "/v1/stripe";
    router = Router();
    controller: StripeController;

    constructor() {
        this.controller = new StripeController();
        this.initRoute();
      }

      initRoute(): void {
        
        this.router.post(this.path+'/createCheckout', 
        this.controller.createCheckOutSession),

        this.router.post(this.path+'/webhook', 
        bodyParser.raw({type: "application/json"}),
        this.controller.stripeWebhookCall)

      }
}

export { StripeRoute }