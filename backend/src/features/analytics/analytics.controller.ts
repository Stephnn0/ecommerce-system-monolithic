import { AnalyticsService } from "./analytics.service";
import { Request, Response } from "express";



class AnalyticsController {

    analyticsService: AnalyticsService;

    constructor() {
        this.analyticsService = new AnalyticsService();
    }


        //create order
        getTotalSalesRevenue = async (request: Request, response: Response) => {
            try {
                const results = await this.analyticsService.getTotalSalesRevenue()
    
                response.status(200).json(results);
    
            } catch(err){
                console.log(err)
                response.status(500).json({ message: 'Internal server error' });
            }
        }


         // Method to fetch sales data
        getSalesData = async (request: Request, response: Response) => {
        try {
            const salesData = await this.analyticsService.getSalesData();
            response.status(200).json(salesData);
        } catch (err) {
            console.error("Error fetching sales data:", err);
            response.status(500).json({ message: 'Internal server error' });
        }
    }
    }






export { AnalyticsController }