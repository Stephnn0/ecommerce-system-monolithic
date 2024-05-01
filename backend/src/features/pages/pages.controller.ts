import { PageService } from "./pages.service";
import { Request, Response } from "express";





class PageController {

    pageService: PageService;

    constructor() {
        this.pageService = new PageService();
    }

    getSinglePage = async (request: Request, response: Response) => {
       const { id } = request.query

        console.log(id, 'id')

        try {
            const singlePage = await this.pageService.getSinglePage(id as string)

            response.status(200).json(singlePage);

        } catch(err){
            console.log('error', err)
            response.status(500).json({message: err});


        }
    }

}



export { PageController }