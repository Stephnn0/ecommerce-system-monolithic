"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.returnMappedProductsWithAwsS3Images = exports.uploadImageToS3 = exports.generateUploadURL = exports.s3ClientPersonal = exports.secretAccessKey = exports.accessKeyId = exports.bucketRegion = exports.bucketName = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
const dotenv_1 = __importDefault(require("dotenv"));
const randombytes_1 = __importDefault(require("randombytes"));
dotenv_1.default.config();
exports.bucketName = process.env.BUCKET_NAME;
exports.bucketRegion = process.env.BUCKET_REGION;
exports.accessKeyId = process.env.ACCESS_KEY;
exports.secretAccessKey = process.env.SECRET_ACCESS_KEY;
exports.s3ClientPersonal = new client_s3_1.S3Client({
    credentials: {
        accessKeyId: exports.accessKeyId,
        secretAccessKey: exports.secretAccessKey
    },
    region: exports.bucketRegion,
});
async function generateUploadURL() {
    const rawBytes = await (0, randombytes_1.default)(16);
    const imageName = rawBytes.toString('hex');
    const key = `products/${imageName}`;
    const params = ({
        Bucket: exports.bucketName,
        Key: key,
    });
    const command = new client_s3_1.PutObjectCommand(params);
    const uploadURL = await (0, s3_request_presigner_1.getSignedUrl)(exports.s3ClientPersonal, command, { expiresIn: 36000 });
    return uploadURL;
}
exports.generateUploadURL = generateUploadURL;
const uploadImageToS3 = async (fileBuffer, bucketName) => {
    try {
        const rawBytes = (0, randombytes_1.default)(16);
        const imageName = rawBytes.toString('hex');
        const key = `services/${imageName}`;
        const params = {
            Bucket: bucketName,
            Key: key,
            Body: fileBuffer,
        };
        await exports.s3ClientPersonal.send(new client_s3_1.PutObjectCommand(params));
        return imageName;
    }
    catch (error) {
        throw new Error('Error uploading image to S3');
    }
};
exports.uploadImageToS3 = uploadImageToS3;
const returnMappedProductsWithAwsS3Images = async (products) => {
    const productsWithImages = [];
    for (const product of products) {
        const { awsUrl } = product;
        const key = `services/${awsUrl}/`;
        const getObjectParams = {
            Bucket: exports.bucketName,
            Key: key
        };
        try {
            const command = new client_s3_1.ListObjectsCommand(getObjectParams);
            const { Contents } = await exports.s3ClientPersonal.send(command);
            if (Contents && Contents.length > 0) {
                const matchingObjects = Contents.filter(obj => {
                    const parts = obj.Key.split('/');
                    return parts[1] === awsUrl;
                });
                if (matchingObjects.length > 0) {
                    const firstFound = matchingObjects[0];
                    const firstImageUrl = `https://vegeta12.s3.us-east-1.amazonaws.com/${firstFound.Key}`;
                    product.imgUrl = firstImageUrl;
                }
            }
        }
        catch (error) {
            console.error(`Error mapping images for product ID ${product.id}:`, error);
        }
        productsWithImages.push(product);
    }
    return productsWithImages;
};
exports.returnMappedProductsWithAwsS3Images = returnMappedProductsWithAwsS3Images;
//# sourceMappingURL=aws.js.map