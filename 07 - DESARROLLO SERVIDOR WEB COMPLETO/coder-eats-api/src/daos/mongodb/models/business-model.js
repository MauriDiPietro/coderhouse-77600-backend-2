import { Schema, model } from "mongoose";

const ProductSubSchema = new Schema({
  nombre: { type: String, required: true },
  precio: { type: Number, required: true },
  descripcion: { type: String, required: true },
  imagen: { type: String },
  stock: { type: Number, default: 0 },
});

const BusinessSchema = new Schema({
  nombre: { type: String, required: true },
  productos: [ProductSubSchema],
});

export const BusinessModel = model("business", BusinessSchema);
