import { bucketName, returnMappedProductsWithAwsS3Images, s3ClientPersonal, uploadImageToS3 } from "../../aws/aws";
import { ProductService } from "./product.service";
import { Request, Response } from "express";
import { IProduct } from "./product.interface";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

class ProductController {
    productService: ProductService;

    constructor() {
        this.productService = new ProductService();
    }




    getSingleProduct = async (request: Request, response: Response) => {
        const id: number = parseInt(request.params.id);

        try {
            const singlePost = await this.productService.getSingleProduct(id)

            if (singlePost) {
                const { awsUrl } = singlePost;

                const key = `services/${awsUrl}`;

                const getObjectParams = {
                    Bucket: bucketName,
                    Key: key
                };

                const command = new GetObjectCommand(getObjectParams);
                const uploadURL = await getSignedUrl(s3ClientPersonal, command, { expiresIn: 36000})

                singlePost.imgUrl = uploadURL

            }
            response.status(200).json(singlePost);
            } catch (error: unknown) {
            console.log('error', error)
          }
    }


    createProduct = async (request: Request, response: Response) => {
        console.log(request, 'request')
        const file = request.file 
        if (!file) {
          return response.status(400).send("No file uploaded");
        }

        try {

        const { title, description, category, price, quantity } = request.body;

        console.log(file, 'file')

        if (!title || !description || !category || !price || !quantity ) {
            return response.status(400).json({ message: 'All fields are required.' });
        }

        const imageName = await uploadImageToS3(file.buffer, bucketName);

        const productData = { title, description, category, price, quantity, awsUrl: imageName}; 

        const results = await this.productService.createProduct(productData)

        response.status(201).json(results);

        } catch (err){
            console.log(err)
            response.status(500).json({ message: 'Internal server error' });
        }
     }



     getAllProducts = async (request: Request, response: Response) => {

        try {
            const results = await this.productService.getAllProducts()

            const productsWithImages: IProduct[] = await returnMappedProductsWithAwsS3Images(results as IProduct[]);

            response.status(200).json(productsWithImages);

        } catch(err){
            console.log(err)
            response.status(500).json({ message: 'Internal server error' });
        }

     }




     getProductsByCategory = async (request: Request, response: Response) => {
       const { category } = request.query; 

        try {
            const products = await this.productService.getProductsByCategory(category as string)
            const productsWithImages: IProduct[] = await returnMappedProductsWithAwsS3Images(products as IProduct[]);


            response.status(200).json(productsWithImages);


        } catch(err){
            console.log(err)
            response.status(500).json({ message: 'Internal server error' });
        }
     }


     getCartProducts = async (request: Request, response: Response) => {

        const { ids } = request.query;
        const cartItemsArray = JSON.parse(ids as string);
        const idsArray = cartItemsArray.map((item: any) => item.id)

        try {

            if(idsArray.length === 0){
                return response.status(200).json({ message: 'empy cart' });
            }

            if (!idsArray || !Array.isArray(idsArray)) {
                return response.status(400).json({ message: 'Invalid IDs provided' });
            }

            const products = await this.productService.getCartProducts(idsArray);
            const productsWithImages: IProduct[] = await returnMappedProductsWithAwsS3Images(products as IProduct[]);
            response.status(200).json(productsWithImages);

        } catch(err){
            console.error(err);
            response.status(500).json({ message: 'Internal server error' });
        }
     }
}


export { ProductController };


