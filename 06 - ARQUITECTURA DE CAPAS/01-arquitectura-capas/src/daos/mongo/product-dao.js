import MongoDao from "./mongo-dao.js";
import { ProductModel } from "./models/product-model.js";

class ProductMongoDao extends MongoDao {
    constructor(model) {
        super(model);
    }
}

export const productDaoMongo = new ProductMongoDao(ProductModel);

