import MongoDao from "./mongo-dao.js";
import { ProductModel } from "./models/product-model.js";

export default class ProductMongoDao extends MongoDao {
    constructor() {
        super(ProductModel);
    }
}


