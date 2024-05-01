import { Router } from "express";
import { AnalyticsController } from "./analytics.controller";



class AnalyticsRoute {
    path = "/v1/analytics";
    router = Router();
    controller: AnalyticsController;

    constructor() {
        this.controller = new AnalyticsController();
        this.initRoute();
      }

      initRoute(): void {

          this.router.get(this.path + '/totalsales', this.controller.getTotalSalesRevenue),
          this.router.get(this.path + '/salesData', this.controller.getSalesData)

        
      }
}

export { AnalyticsRoute }