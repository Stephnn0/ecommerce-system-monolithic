"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AwsRoute = void 0;
const express_1 = require("express");
const aws_controller_1 = require("./aws.controller");
class AwsRoute {
    constructor() {
        this.path = "/v1/aws";
        this.router = (0, express_1.Router)();
        this.controller = new aws_controller_1.AwsController();
        this.initRoute();
    }
    initRoute() {
        this.router.get(this.path + '/service-s3Url', this.controller.generateAWSurl);
    }
}
exports.AwsRoute = AwsRoute;
//# sourceMappingURL=aws.route.js.map