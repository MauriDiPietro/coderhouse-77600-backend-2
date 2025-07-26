import { Router } from "express";
import { productManager } from "../manager/product-manager.js";

const router = Router();

router.get("/", async (req, res) => {
  // res.send('hola mundo');
  //   console.log(req.query);
  const { value } = req.query;
  const products = await productManager.getAll();
  if (!value) res.status(200).json(products);
  const productsFilter = products.filter((p) => p.price > parseInt(value));
  res.status(200).json(productsFilter);
  //! PRECIO MAYOR A |___| |BUSCAR|
});

router.get("/:pid", async (req, res) => {
    try {
        const { pid } = req.params;
        // console.log(pid);
        const product = await productManager.getById(pid);
        res.json(product);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
})

export default router;