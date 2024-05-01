import { Application, Request, Response } from "express";
import { BadRequest } from "./shared/error/client.error";
import { HealthCheckRoute } from "./features/health/health.route";
import { UserRoute } from "./features/user/user.route";
import { ProductRoute } from "./features/product/product.route";
import { AwsRoute } from "./aws/aws.route";
import { StripeRoute } from "./stripe/stripe.route";
import { OrderRoute } from "./features/order/order.route";
import { AnalyticsRoute } from "./features/analytics/analytics.route";
import { AddressRoute } from "./features/address/address.router";
import { PageRoute } from "./features/pages/pages.route";




const appModuleRoute = (app: Application) => {
    const moduleRoute = () => [
      new HealthCheckRoute(),
      new UserRoute(),
      new ProductRoute(),
      new AwsRoute(),
      new StripeRoute(),
      new OrderRoute(),
      new AnalyticsRoute(),
      new AddressRoute(),
      new PageRoute()
    ];

    moduleRoute().forEach((appRoute) => {
      app.use("/api", appRoute.router);
    });
}


const appDefaultRoute = (app: Application) => {
    app.use("*", (request: Request, response: Response) => {
        throw new BadRequest();
      });
}


export { appDefaultRoute, appModuleRoute };