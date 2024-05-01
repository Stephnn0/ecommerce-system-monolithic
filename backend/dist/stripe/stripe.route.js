"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StripeRoute = void 0;
const express_1 = require("express");
const stripe_1 = require("./stripe");
const body_parser_1 = __importDefault(require("body-parser"));
class StripeRoute {
    constructor() {
        this.path = "/v1/stripe";
        this.router = (0, express_1.Router)();
        this.controller = new stripe_1.StripeController();
        this.initRoute();
    }
    initRoute() {
        this.router.post(this.path + '/createCheckout', this.controller.createCheckOutSession),
            this.router.post(this.path + '/webhook', body_parser_1.default.raw({ type: "application/json" }), this.controller.stripeWebhookCall);
    }
}
exports.StripeRoute = StripeRoute;
//# sourceMappingURL=stripe.route.js.map