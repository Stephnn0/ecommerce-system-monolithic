import { Router } from "express";
import { OrderController } from "./order.controller";

class OrderRoute {
    path = "/v1/order";
    router = Router();
    controller: OrderController;

    constructor() {
        this.controller = new OrderController();
        this.initRoute();
      }

      initRoute(): void {

          this.router.get(
          this.path + '/getAll',
          //permissions
          this.controller.getAllOrders),
        
          this.router.get(this.path + '/bycustomer', this.controller.getOrderByCustomer)

 
      }
}

export { OrderRoute }