import BaseRepository from "./base-repository.js";
import { businessDao } from "../daos/mongodb/business-dao.js";

class BusinessRepository extends BaseRepository {
  constructor(dao) {
    super(dao);
  }
}

export const businessRepository = new BusinessRepository(businessDao);