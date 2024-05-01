import { S3Client, PutObjectCommand, ListObjectsCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import dotenv from 'dotenv'
import randomBytes from 'randombytes'
import { IProduct } from '../features/product/product.interface';

dotenv.config();


export const bucketName = process.env.BUCKET_NAME
export const bucketRegion = process.env.BUCKET_REGION
export const accessKeyId = process.env.ACCESS_KEY
export const secretAccessKey = process.env.SECRET_ACCESS_KEY


export const s3ClientPersonal = new S3Client({
    credentials: {
        accessKeyId: accessKeyId,
        secretAccessKey: secretAccessKey
    },
    region: bucketRegion,
});


export async function generateUploadURL() {
    const rawBytes = await randomBytes(16)
    const imageName = rawBytes.toString('hex')
    const key = `products/${imageName}`;

    const params = ({
        Bucket: bucketName,
        Key: key,
    });

    const command = new PutObjectCommand(params)
    const uploadURL = await getSignedUrl(s3ClientPersonal, command, { expiresIn: 36000})
    return uploadURL
}


export const uploadImageToS3 = async (fileBuffer: Buffer, bucketName: string): Promise<string> => {
    try {
      const rawBytes = randomBytes(16);
      const imageName = rawBytes.toString('hex');
      const key = `services/${imageName}`;
  
      const params = {
        Bucket: bucketName,
        Key: key,
        Body: fileBuffer,
      };
  
      // Upload image to S3
      await s3ClientPersonal.send(new PutObjectCommand(params));
  
      return imageName; // Return generated image name
    } catch (error) {
      throw new Error('Error uploading image to S3');
    }
  };



  export const returnMappedProductsWithAwsS3Images = async (products: IProduct[]): Promise<IProduct[]> => {
    const productsWithImages: IProduct[] = [];

    for (const product of products) {
        const { awsUrl } = product;
        const key = `services/${awsUrl}/`;

        const getObjectParams = {
            Bucket: bucketName,
            Key: key
        };
        
        try {
            const command = new ListObjectsCommand(getObjectParams);
            const { Contents } = await s3ClientPersonal.send(command);

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
        } catch (error) {
            console.error(`Error mapping images for product ID ${product.id}:`, error);
        }
        
        productsWithImages.push(product);
    }
    return productsWithImages;

  }

