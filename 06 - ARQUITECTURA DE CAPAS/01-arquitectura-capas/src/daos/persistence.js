import { productDaoFS } from "./filesystem/product-dao.js";
import { productDaoMongo } from "./mongo/product-dao.js";

let productDao = null;
// let userDao = null;
// let cartDao = null;

let PERSISTENCE = process.env.PERSISTENCE

switch (PERSISTENCE) {
  case "mongo":
    productDao = productDaoMongo;
    break;
  case "fs":
    productDao = productDaoFS;
    break;
  default:
    break;
}

export default { 
    productDao, 
    // userDao, 
    // cartDao 
};
