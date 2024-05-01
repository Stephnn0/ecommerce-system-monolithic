import { Router } from "express";
import { AwsController } from "./aws.controller";

class AwsRoute {
    path = "/v1/aws";
    router = Router();
    controller: AwsController;

    constructor() {
        this.controller = new AwsController();
        this.initRoute();
      }

      initRoute(): void {
        this.router.get(this.path+'/service-s3Url', this.controller.generateAWSurl)
      }
}

export { AwsRoute }