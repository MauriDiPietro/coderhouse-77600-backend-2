import { Schema, model } from "mongoose";

const ProductSubSchema = new Schema({
  nombre: { Type: String, required: true },
  precio: { Type: Number, required: true },
  descripcion: { Type: String, required: true },
  imagen: { Type: String },
  stock: { Type: Number, default: 0 },
});

const BusinessSchema = new Schema({
  nombre: { Type: String, required: true },
  productos: [ProductSubSchema],
});

export const BusinessModel = model("business", BusinessSchema);
