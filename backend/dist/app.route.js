"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appModuleRoute = exports.appDefaultRoute = void 0;
const client_error_1 = require("./shared/error/client.error");
const health_route_1 = require("./features/health/health.route");
const user_route_1 = require("./features/user/user.route");
const product_route_1 = require("./features/product/product.route");
const aws_route_1 = require("./aws/aws.route");
const stripe_route_1 = require("./stripe/stripe.route");
const order_route_1 = require("./features/order/order.route");
const analytics_route_1 = require("./features/analytics/analytics.route");
const address_router_1 = require("./features/address/address.router");
const pages_route_1 = require("./features/pages/pages.route");
const appModuleRoute = (app) => {
    const moduleRoute = () => [
        new health_route_1.HealthCheckRoute(),
        new user_route_1.UserRoute(),
        new product_route_1.ProductRoute(),
        new aws_route_1.AwsRoute(),
        new stripe_route_1.StripeRoute(),
        new order_route_1.OrderRoute(),
        new analytics_route_1.AnalyticsRoute(),
        new address_router_1.AddressRoute(),
        new pages_route_1.PageRoute()
    ];
    moduleRoute().forEach((appRoute) => {
        app.use("/api", appRoute.router);
    });
};
exports.appModuleRoute = appModuleRoute;
const appDefaultRoute = (app) => {
    app.use("*", (request, response) => {
        throw new client_error_1.BadRequest();
    });
};
exports.appDefaultRoute = appDefaultRoute;
//# sourceMappingURL=app.route.js.map