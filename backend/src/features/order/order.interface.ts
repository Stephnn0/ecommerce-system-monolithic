interface IOrder {
    id?: number;
    orderNumber?: string;
    total?: string;
    status?: string;
    date?: number;
    customerId?: string;
}

interface IOrderItem {
    id?: number;
    orderId?: string;
    productId?: number;
    quantity?: string;
    subtotal?: number;
}

interface IOrderCreate extends IOrder {
}

interface IOrderItemCreate extends IOrder {
}

interface IOrderByCustomer extends IOrder {
}



interface IOrderService {
    createOrder(customerId: any, metadata: any): Promise<IOrder>;
    createOrderItem(orderId: string, productId: number): any;
    getAllOrders(): any;
    getOrdersByCustomer(customer: string): any; 
}

export { IOrderService, IOrderByCustomer, IOrderItemCreate, IOrderCreate, IOrderItem, IOrder}

