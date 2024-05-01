import { Router } from "express";
import { PageController } from "./pages.controller";

class PageRoute {
    path = "/v1/page";
    router = Router();
    controller: PageController;

    constructor() {
        this.controller = new PageController();
        this.initRoute();
      }

      initRoute(): void {

        this.router.get( this.path + '/getSinglePage', this.controller.getSinglePage)

      }




    }


    export { PageRoute }