import { v4 as uuid } from "uuid";
import { orderRepository } from "../repositories/order-repository.js";
import { businessService } from "./business-service.js";
import CustomError from "../utils/custom-error.js";

class OrderService {
  constructor(repository) {
    this.repository = repository;
  }

  getAll = async () => {
    try {
      return await this.repository.getAllOrders();
    } catch (error) {
      throw new Error(error);
    }
  };

  getById = async (id) => {
    try {
      const order = await this.repository.getOrderById(id);
      if (!order) throw new CustomError("order not found", 404);
      return order;
    } catch (error) {
      throw error;
    }
  };

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
        precioTotal
      });

      return order;
    } catch (error) {
      throw error;
    }
  };

  update = async (id, body) => {
    try {
      const order = await this.repository.update(id, body);
      if (!order) throw new CustomError("order not found for update", 404);
      return order;
    } catch (error) {
      throw error;
    }
  };

  delete = async (id) => {
    try {
      const order = await this.repository.delete(id);
      if (!order) throw new CustomError("order not found for deletion", 404);
      return order;
    } catch (error) {
      throw error;
    }
  };
}

export const orderService = new OrderService(orderRepository);
