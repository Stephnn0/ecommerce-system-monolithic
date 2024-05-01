import { Router } from "express";
import { UserController } from "./user.controller";


class UserRoute {
    path = "/v1/auth";
    router = Router();
    controller: UserController;

    constructor() {
        this.controller = new UserController();
        this.initRoute();
      }

      initRoute(): void {
          this.router.post(this.path+'/register', this.controller.register)
          this.router.post(this.path+'/login', this.controller.login)
          this.router.get(this.path+'/refresh', this.controller.refreshToken)
          this.router.get(this.path+'/logout', this.controller.logout)


      }
}

export { UserRoute }