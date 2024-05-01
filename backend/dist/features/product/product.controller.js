"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const aws_1 = require("../../aws/aws");
const product_service_1 = require("./product.service");
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
class ProductController {
    constructor() {
        this.getSingleProduct = async (request, response) => {
            const id = parseInt(request.params.id);
            try {
                const singlePost = await this.productService.getSingleProduct(id);
                if (singlePost) {
                    const { awsUrl } = singlePost;
                    const key = `services/${awsUrl}`;
                    const getObjectParams = {
                        Bucket: aws_1.bucketName,
                        Key: key
                    };
                    const command = new client_s3_1.GetObjectCommand(getObjectParams);
                    const uploadURL = await (0, s3_request_presigner_1.getSignedUrl)(aws_1.s3ClientPersonal, command, { expiresIn: 36000 });
                    singlePost.imgUrl = uploadURL;
                }
                response.status(200).json(singlePost);
            }
            catch (error) {
                console.log('error', error);
            }
        };
        this.createProduct = async (request, response) => {
            console.log(request, 'request');
            const file = request.file;
            if (!file) {
                return response.status(400).send("No file uploaded");
            }
            try {
                const { title, description, category, price, quantity } = request.body;
                console.log(file, 'file');
                if (!title || !description || !category || !price || !quantity) {
                    return response.status(400).json({ message: 'All fields are required.' });
                }
                const imageName = await (0, aws_1.uploadImageToS3)(file.buffer, aws_1.bucketName);
                const productData = { title, description, category, price, quantity, awsUrl: imageName };
                const results = await this.productService.createProduct(productData);
                response.status(201).json(results);
            }
            catch (err) {
                console.log(err);
                response.status(500).json({ message: 'Internal server error' });
            }
        };
        this.getAllProducts = async (request, response) => {
            try {
                const results = await this.productService.getAllProducts();
                const productsWithImages = await (0, aws_1.returnMappedProductsWithAwsS3Images)(results);
                response.status(200).json(productsWithImages);
            }
            catch (err) {
                console.log(err);
                response.status(500).json({ message: 'Internal server error' });
            }
        };
        this.getProductsByCategory = async (request, response) => {
            const { category } = request.query;
            try {
                const products = await this.productService.getProductsByCategory(category);
                const productsWithImages = await (0, aws_1.returnMappedProductsWithAwsS3Images)(products);
                response.status(200).json(productsWithImages);
            }
            catch (err) {
                console.log(err);
                response.status(500).json({ message: 'Internal server error' });
            }
        };
        this.getCartProducts = async (request, response) => {
            const { ids } = request.query;
            const cartItemsArray = JSON.parse(ids);
            const idsArray = cartItemsArray.map((item) => item.id);
            try {
                if (idsArray.length === 0) {
                    return response.status(200).json({ message: 'empy cart' });
                }
                if (!idsArray || !Array.isArray(idsArray)) {
                    return response.status(400).json({ message: 'Invalid IDs provided' });
                }
                const products = await this.productService.getCartProducts(idsArray);
                const productsWithImages = await (0, aws_1.returnMappedProductsWithAwsS3Images)(products);
                response.status(200).json(productsWithImages);
            }
            catch (err) {
                console.error(err);
                response.status(500).json({ message: 'Internal server error' });
            }
        };
        this.productService = new product_service_1.ProductService();
    }
}
exports.ProductController = ProductController;
//# sourceMappingURL=product.controller.js.map