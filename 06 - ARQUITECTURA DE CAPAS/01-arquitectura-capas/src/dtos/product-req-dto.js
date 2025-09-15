export class ProductRequestDTO {
  constructor({ nombre, descripcion, precio, disponibilidad }) {
    if (!nombre || !descripcion || !precio || !disponibilidad)
      throw new Error("Faltan datos obligatorios");
    this.name = nombre;
    this.description = descripcion;
    this.price = precio;
    this.stock = disponibilidad;
  }
}
