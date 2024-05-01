"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StripeController = exports.stripe = void 0;
const stripe_1 = __importDefault(require("stripe"));
const product_service_1 = require("../features/product/product.service");
const order_service_1 = require("../features/order/order.service");
exports.stripe = new stripe_1.default(process.env.STRIPE_PRIVATE_KEY, {
    apiVersion: '2023-10-16',
});
const signedKey = process.env.STRIPE_WEBHOOK_KEY_PRODUCTION;
class StripeController {
    constructor() {
        this.createCheckOutSession = async (req, res) => {
            console.log('stipe hit-----');
            try {
                const { cartItems, customerId, email, subtotal } = req.body;
                console.log(cartItems, customerId, customerId, subtotal);
                if (!Array.isArray(cartItems) || cartItems.length === 0) {
                    return res.status(400).json({ error: 'Invalid or empty products array' });
                }
                let stripeCustomerId = customerId;
                try {
                    await exports.stripe.customers.list({
                        email: email,
                    });
                }
                catch (error) {
                    if (error.statusCode === 404) {
                        const customer = await exports.stripe.customers.create({
                            email: email,
                            metadata: {
                                userId: customerId,
                                cart: JSON.stringify(cartItems),
                            },
                        });
                        stripeCustomerId = customer.id;
                    }
                    else {
                        throw error;
                    }
                }
                console.log('stipe hit 2-----');
                const productDetails = await Promise.all(cartItems.map(async (id) => {
                    const service = await this.productService.getSingleProduct(Number(id));
                    if (!service) {
                        throw new Error(`Product not found for ID: ${id}`);
                    }
                    console.log('price----', service.price);
                    return {
                        name: service.title,
                        description: service.description,
                        price: service.price,
                        id,
                    };
                }));
                console.log('stipe hit 3-----');
                const lineItems = productDetails.map((product) => ({
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: product.name,
                            description: product.description,
                        },
                        unit_amount: Number(product.price),
                    },
                    quantity: 1,
                }));
                const session = await exports.stripe.checkout.sessions.create({
                    payment_method_types: ['card'],
                    mode: 'payment',
                    metadata: {
                        cart: JSON.stringify(cartItems),
                        subtotal: subtotal
                    },
                    customer_email: email,
                    line_items: lineItems,
                    success_url: process.env.SUCCESS_URL_TEST,
                    cancel_url: process.env.CANCEL_URL_TEST,
                });
                res.json({ sessionId: session.url });
            }
            catch (error) {
                console.log(error, 'error');
                res.status(500).json({ error: 'Failed to create checkout session' });
            }
        };
        this.stripeWebhookCall = async (req, res) => {
            console.log('------- webhook hit ------------');
            const payload = req.body;
            const sig = req.headers['stripe-signature'];
            let event;
            try {
                event = exports.stripe.webhooks.constructEvent(payload, sig, signedKey);
            }
            catch (err) {
                console.log(err);
            }
            switch (payload.type) {
                case 'checkout.session.completed':
                    console.log('email', payload.data.object.customer_email);
                    console.log('metadata', payload.data.object.metadata);
                    const email = payload.data.object.customer_email;
                    const metadata = payload.data.object.metadata;
                    const emailTest = "estefano@email.com";
                    const metadataTestObject = {
                        'cart': '[1, 2, 3, 1]',
                        'subtotal': 543
                    };
                    const response = await this.orderService.createOrder(emailTest, metadataTestObject);
                    console.log('response', response);
                    break;
                case 'payment_intent.created':
                    console.log('payment_intent.created');
                    break;
                default:
                    console.log(`Unhandled event type`);
            }
            res.send().end();
            console.log('success');
        };
        this.productService = new product_service_1.ProductService();
        this.orderService = new order_service_1.OrderService();
    }
}
exports.StripeController = StripeController;
//# sourceMappingURL=stripe.js.map