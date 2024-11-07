'use client';

import React, { useEffect, useState } from 'react';


//-------------------------------------------------------------------------------------------------------------------
const Carrito = () => {
  const [carrito, setCarrito] = useState<any[]>([]);
  const [total, setTotal] = useState<number>(0);

  // Función para calcular el total
  //para sacar el total sin isv primero multiplicamos la cantidad de productos por el precio del producto
  //luego el total sin isv le sumamos el 15% y este nos da al subtotal
  //al subtotal le sumamos el total sin isv y esto nos da el gran total a pagar
  const calcularTotal = (cart: any[]) => {
    let subtotal = 0;
    const carritoConTotales = cart.map((producto: any) => {
      const totalSinIsv = Number(producto.PrecioProducto) * producto.cantidad;
      const isv = totalSinIsv * 0.15;
      const subtotalProducto = totalSinIsv + isv;
      subtotal += subtotalProducto;

      // Agregar propiedades calculadas al producto
      return { ...producto, totalSinIsv, subtotalProducto };
    });

//----------------------------------------------------------------------------------------------------------------------------------------------------------
   
  setCarrito(carritoConTotales);  // Guardar carrito con los valores calculados
    setTotal(Number(subtotal.toFixed(2)));
  };

  // estado para cargar carrito desde localStorage
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    calcularTotal(cart);
  }, []);

  // funcion para Eliminar producto del carrito
  const eliminarProducto = (id: number) => {
    const updatedCart = carrito.filter((producto: any) => producto.IdProducto !== id);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    calcularTotal(updatedCart);
  };

//----------------------------------------------------------------------------------------------------------------------------
  return (
    <div className="container mt-5">
      <h2>Carrito de compras</h2>
      {carrito.length === 0 ? (
        <p>Vaya a Producto para agregar contenido al carrito.</p>
      ) : (
        <div>
          <table className="table">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Total sin ISV</th>
                <th>Subtotal + 15%</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {carrito.map((producto: any) => (
                <tr key={producto.IdProducto}>
                  <td>{producto.NombreProducto}</td>
                  <td>${Number(producto.PrecioProducto).toFixed(2)}</td>
                  <td>{producto.cantidad}</td>
                  <td>${Number(producto.totalSinIsv).toFixed(2)}</td>
                  <td>${Number(producto.subtotalProducto).toFixed(2)}</td>
                  <td>
                    
                    <button
                      className="btn btn-danger"
                      onClick={() => eliminarProducto(producto.IdProducto)}
                    >
                      Eliminar
                    </button>


                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <h3>Total a pagar: ${total}</h3>
        </div>
      )}
    </div>
  );
};

export default Carrito;
