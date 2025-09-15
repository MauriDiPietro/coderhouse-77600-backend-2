import MongoDao from "./mongo-dao.js";
import { BusinessModel } from "./models/business-model.js";

class BusinessDao extends MongoDao {
  constructor(model) {
    super(model);
  }
}

export const businessDao = new BusinessDao(BusinessModel);
