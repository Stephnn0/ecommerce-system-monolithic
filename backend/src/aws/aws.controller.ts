import { generateUploadURL } from "./aws";
import { Request, Response } from "express";


class AwsController {

    generateAWSurl = async (req: Request, res: Response) => {
            try {
              const url = await generateUploadURL()
              res.send({ url });
          
            } catch (err) {
              console.log(err)      
            }
     }
}
export { AwsController };
