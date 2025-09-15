import { v4 as uuid } from "uuid";
import { orderRepository } from "../repositories/order-repository.js";
import { businessService } from "./business-service.js";
import CustomError from "../utils/custom-error.js";

class OrderService {
  constructor(repository) {
    this.repository = repository;
  }

  create = async (body) => {
    try {
      const { usuarioId, negocioId, items } = body;

      const negocio = await businessService.getById(negocioId);

      const productosPedido = [];
      let precioTotal = 0;

      for (const it of items) {
        const prod = negocio.productos.find(
          (p) => p._id.toString() === it.productId
        );

        if (!prod) throw new Error("product no encontrado en el negocio");

        if (prod.stock < it.cantidad) throw new Error("stock insuficiente");

        prod.stock = prod.stock - it.cantidad;

        const itemPrecio = prod.precio * it.cantidad;
        precioTotal += itemPrecio;

        productosPedido.push({
          productId: prod._id,
          nombre: prod.nombre,
          precioUnitario: prod.precio,
          cantidad: it.cantidad,
        });
      }

      await businessService.update(negocioId, { productos: negocio.productos });

      const order = await this.repository.create({
        numeroOrden: uuid(),
        negocio: negocioId,
        usuario: usuarioId,
        productos: productosPedido,
      });

      return order;
    } catch (error) {
      throw error;
    }
  };
}
