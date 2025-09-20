import { Schema, model } from "mongoose";

const OrderProductSchema = new Schema({
  productId: { type: Schema.Types.ObjectId },
  nombre: { type: String },
  precioUnitario: { type: Number },
  cantidad: { type: Number, default: 1 },
});

const OrderSchema = new Schema({
  numeroOrden: { type: String, required: true, unique: true },
  negocio: { type: Schema.Types.ObjectId, ref: "business", required: true },
  usuario: { type: Schema.Types.ObjectId, ref: "user", required: true },
  productos: [OrderProductSchema],
  precioTotal: { type: Number, required: true },
});

export const OrderModel = model("order", OrderSchema);