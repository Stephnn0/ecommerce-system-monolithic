interface IProduct {
    id?: number;
    title?: string;
    description?: string;
    category?: string;
    price?: number;
    quantity?: string;
    sales?: number;
    imgUrl?: string;
    awsUrl?: string;
}


interface IProductCreate extends IProduct {
}

interface IProductByCategory extends IProduct {
}


interface IProductUpdate extends IProduct {
}


interface IProductService {
    createProduct(product: IProductCreate): Promise<IProduct>;
    getAllProducts(): any;
    getProductsByCategory(category: string): any;
    deleteProduct(productId: number): any;
    updateProduct(product: IProductUpdate): any;
    getSingleProduct(productId: number): any
    getCartProducts(ids: string[]): any;
}

export { IProductService, IProductCreate, IProduct, IProductByCategory, IProductUpdate}