import { OrderService } from "./order.service";
import { Request, Response } from "express";




class OrderController {

    orderService: OrderService;

    constructor() {
        this.orderService = new OrderService();
    }



    //create order
    getAllOrders = async (request: Request, response: Response) => {
        try {
            const results = await this.orderService.getAllOrders()

            response.status(200).json(results);

        } catch(err){
            console.log(err)
            response.status(500).json({ message: 'Internal server error' });
        }
    }

    getOrderByCustomer = async (request: Request, response: Response) => {

        const { customerEmail } = request.query; 

        try {
            const results = await this.orderService.getOrdersByCustomer(customerEmail as string)
            response.status(200).json(results);

        } catch(err){
            console.log(err)
            response.status(500).json({ message: 'Internal server error' });

        }

    }



}


export { OrderController }