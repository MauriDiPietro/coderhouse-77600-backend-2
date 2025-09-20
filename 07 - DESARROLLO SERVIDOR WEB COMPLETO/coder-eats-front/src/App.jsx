import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get("http://localhost:8080/orders");
        setOrders(res.data);
      } catch (err) {
        setError("Error cargando órdenes");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) return <div className="p-4">Cargando...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Listado de Órdenes</h1>
      <table className="w-full border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border"># Orden</th>
            <th className="p-2 border">Negocio</th>
            <th className="p-2 border">Usuario</th>
            <th className="p-2 border">Productos</th>
            <th className="p-2 border">Total</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o._id}>
              <td className="p-2 border">{o.numeroOrden}</td>
              <td className="p-2 border">{o.negocio?.nombre}</td>
              <td className="p-2 border">{o.usuario?.nombre}</td>
              <td className="p-2 border">
                <ul className="list-disc list-inside">
                  {o.productos.map((p, idx) => (
                    <li key={idx}>
                      {p.nombre} x{p.cantidad} (${p.precioUnitario})
                    </li>
                  ))}
                </ul>
              </td>
              <td className="p-2 border font-semibold">${o.precioTotal}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
