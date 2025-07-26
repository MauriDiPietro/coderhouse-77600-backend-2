import express from "express";
import productRouter from './routes/product-router.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/products', productRouter);

app.listen(8080, () => console.log("Server running on port 8080"));
