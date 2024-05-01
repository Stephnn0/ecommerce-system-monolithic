export interface Product {
    id: number;
    title: string;
    category: string;
    description: string;
    quantity: number;
    price: number;
    imgUrl: string; // URL to the product image
}


export interface Order {
    orderId: string;
    subtotal: string;
    status: string;
    date: string;
}

