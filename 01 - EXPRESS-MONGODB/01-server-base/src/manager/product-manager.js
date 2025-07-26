import fs from "fs";
import { v4 as uuidv4 } from "uuid";

class ProductManager {
  constructor(path) {
    this.path = path;
  }

  async getAll() {
    try {
      if (fs.existsSync(this.path)) {
        const users = await fs.promises.readFile(this.path, "utf8");
        return JSON.parse(users);
      }
      return [];
    } catch (error) {
      throw new Error(error);
    }
  }

  async create(obj) {
    try {
      const product = {
        id: uuidv4(),
        ...obj,
      };
      const products = await this.getAll();
      const productExist = await this.getById(product.id);
      if (productExist) throw new Error("El producto ya existe");
      products.push(product);
      await fs.promises.writeFile(this.path, JSON.stringify(products));
      return product;
    } catch (error) {
      throw error;
    }
  }

  async getById(id) {
    try {
      const products = await this.getAll();
      const productExist = products.find((p) => p.id === id);
      if (!productExist) throw new Error("Producto no encontrado");
      return productExist;
    } catch (error) {
      throw error;
    }
  }

  async update(obj, id) {
    try {
      const products = await this.getAll();
      let productExist = await this.getById(id);
      productExist = { ...productExist, ...obj };
      const newArray = products.filter((u) => u.id !== id);
      newArray.push(productExist);
      await fs.promises.writeFile(this.path, JSON.stringify(newArray));
      return productExist;
    } catch (error) {
      throw error;
    }
  }

  async delete(id) {
    const products = await this.getAll();
    if (products.length > 0) {
      const productExist = await this.getById(id);
      const newArray = products.filter((u) => u.id !== id);
      await fs.promises.writeFile(this.path, JSON.stringify(newArray));
      return productExist;
    }
  }

  async deleteAll() {
    try {
      await fs.promises.unlink(this.path);
    } catch (error) {
      throw new Error(error);
    }
  }
}

export const productManager = new ProductManager("./src/data/products.json");
