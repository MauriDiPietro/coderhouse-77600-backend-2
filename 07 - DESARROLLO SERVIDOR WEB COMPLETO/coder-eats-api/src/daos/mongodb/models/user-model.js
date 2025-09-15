import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  nombre: { type: String, required: true },
  correo: { type: String, required: true },
  rol: { type: String, enum: ["user", "admin"], default: "user" },
  pedidos: [{ type: Schema.Types.ObjectId, ref: "order" }], //populate
});

export const UserModel = model("user", UserSchema);
