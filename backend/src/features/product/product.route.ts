import { Router } from "express";
import { ProductController } from "./product.controller";
import verifyJWT from "../../shared/middleware/verifyJWT";
import verifyRoles from "../../shared/middleware/verifyRoles";
import { fileUploadMiddleware } from "../../shared/middleware/fileUpload";

const ROLES_LIST = {
    "admin": 'admin',
    "user": 'user',
}

class ProductRoute {
    path = "/v1/product";
    router = Router();
    controller: ProductController;

    constructor() {
        this.controller = new ProductController();
        this.initRoute();
      }

      initRoute(): void {
        this.router.post(
        this.path+'/create',
        fileUploadMiddleware,
        verifyJWT,
        //verifyRoles(ROLES_LIST.admin),
        this.controller.createProduct),

        this.router.get(
          this.path + '/getAll',
          this.controller.getAllProducts),

        this.router.get(
            this.path + '/getSingle/:id',
            this.controller.getSingleProduct),

        this.router.get(
            this.path + '/getCart',
            this.controller.getCartProducts),

        this.router.get(
              this.path + '/byCategory',
              this.controller.getProductsByCategory)
        }
   }

      


export { ProductRoute }