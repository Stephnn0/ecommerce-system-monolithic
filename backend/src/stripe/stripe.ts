import { Request, Response } from "express";
import Stripe from "stripe";
import { ProductService } from "../features/product/product.service";
import { OrderService } from "../features/order/order.service";

export const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY, {
    apiVersion: '2023-10-16',
  });

  const signedKey: string = process.env.STRIPE_WEBHOOK_KEY_PRODUCTION



class StripeController {
  productService: ProductService;
  orderService: OrderService;

  constructor() {
      this.productService = new ProductService();
      this.orderService = new OrderService();

  }

  

    createCheckOutSession = async (req: Request, res: Response) => {
      console.log('stipe hit-----')

      try {


        const { cartItems, customerId, email, subtotal} = req.body;

        //cart items list of ids ['1', '2', '3'] ids == product id

        console.log(cartItems, customerId, customerId, subtotal )

        if (!Array.isArray(cartItems) || cartItems.length === 0) {
          return res.status(400).json({ error: 'Invalid or empty products array' });
        }

        // create customer 
        let stripeCustomerId = customerId;
        try {
          await stripe.customers.list({
            email: email,
          });
        } catch (error) {
          if (error.statusCode === 404) {
            const customer = await stripe.customers.create({
                email: email,
                metadata: {
                userId: customerId,
                cart: JSON.stringify(cartItems),
              },
            });
            stripeCustomerId = customer.id;
          } else {
            throw error;
          }
        }
        console.log('stipe hit 2-----')


        // find products 
        const productDetails = await Promise.all(
          cartItems.map(async (id: string) => {

            const service = await this.productService.getSingleProduct(Number(id))

            if (!service) {
              throw new Error(`Product not found for ID: ${id}`);
            }
            console.log('price----', service.price)

            return {
              name: service.title,
              description: service.description,
              price: service.price,
              id, // Include the product ID for reference
            };
          })
        );

        console.log('stipe hit 3-----')


        const lineItems = productDetails.map((product) => ({
          price_data: {
            currency: 'usd',
            product_data: {
              name: product.name,
              description: product.description,
            },
            unit_amount: Number(product.price), 
            // unit_amount: product.price * 100, 

          },
          quantity: 1,
        }));

        const session = await stripe.checkout.sessions.create({
          payment_method_types: ['card'],
          mode: 'payment',
          metadata: {
            cart: JSON.stringify(cartItems), // ['1', '2']
            subtotal: subtotal
          },
          customer_email: email,
          line_items: lineItems,
          success_url: process.env.SUCCESS_URL_TEST, 
          cancel_url: process.env.CANCEL_URL_TEST,
        });
    
        res.json({ sessionId: session.url });
      
    } catch(error){
      console.log(error, 'error')
      res.status(500).json({ error: 'Failed to create checkout session' });
    }

      


    }


    stripeWebhookCall = async (req: Request, res: Response) => {
      console.log('------- webhook hit ------------');

      const payload = req.body
      const sig = req.headers['stripe-signature']
      let event;

      try {
        event = stripe.webhooks.constructEvent(payload, sig, signedKey)
      } catch (err) {
        console.log(err)
      }

      switch (payload.type) {
        case 'checkout.session.completed':
          console.log('email', payload.data.object.customer_email)
          console.log('metadata', payload.data.object.metadata)
          const email = payload.data.object.customer_email
          const metadata = payload.data.object.metadata


          //-----------------------------testing
          //-----------------------------
          //-----------------------------
          const emailTest = "estefano@email.com"
          const metadataTestObject =  {
            'cart':'[1, 2, 3, 1]',
            'subtotal': 543
          }
          // create order 
          // const response = await createOrder(email, metadata)
          const response = await this.orderService.createOrder(emailTest, metadataTestObject )
           console.log('response', response)
          break;
        case 'payment_intent.created':
            console.log('payment_intent.created')
            break;
        default:
          console.log(`Unhandled event type`);
      }
      res.send().end()
      console.log('success')

    }

}

export { StripeController };
