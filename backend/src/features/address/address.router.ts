import { Router } from "express";
import { AddressController } from "./address.controller";


class AddressRoute {
    path = "/v1/address";
    router = Router();
    controller: AddressController;

    constructor() {
        this.controller = new AddressController();
        this.initRoute();
      }

      initRoute(): void {
        
          this.router.post(this.path + '/create', this.controller.createAddress)

      }
}

export { AddressRoute }