
'use client';

import React, { useEffect, useState } from 'react';

const Producto = () => {
  const [productos, setProductos] = useState<any[]>([]);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  // conexion desd el backend
  const fetchProductos = async () => {
    try {
      const response = await fetch('http://localhost:5002/productos');
      const data = await response.json();
      setProductos(data);
    } catch (error) {
      console.error('Error al obtener los productos:', error);
      setError('Ocurrió un error al cargar los productos');
    } finally {
      setLoading(false);
    }
  };
//---------------------------------------------------------------------------------------------------------

  const addToCart = (producto: any) => {
    // Obtener el carrito del almacenamiento local.
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    // Asegurar que el carrito tenga una cantidad y sumar al carrito
    const productoExistente = cart.find((item: any) => item.IdProducto === producto.IdProducto);
    if (productoExistente) {
      productoExistente.cantidad += 1;
    } else {
      producto.cantidad = 1;
      cart.push(producto);
    }
    
    // Guarda el carrito actualizado en localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${producto.NombreProducto} ha sido añadido al carrito`);
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  if (loading) return <div>Espera...</div>;

  if (error) return <div>{error}</div>;

  return (
    <div className="container col-md-6">
      <div className="row">
        {productos.map((producto) => (
          <div key={producto.IdProducto} className="col-md-4 mb-4">
            <div className="card">
              <img
                src={producto.imagenProducto}
                className="card-img-top"
                alt={producto.NombreProducto}
              />
              <div className="card-body">
                <h5 className="card-title">{producto.NombreProducto}</h5>
                <p className="card-text">
                  Precio: ${producto.PrecioProducto} ISV: ${producto.IsvProducto}
                </p>
                <button
                  className="btn btn-primary"
                  onClick={() => addToCart(producto)}
                >
                  agrega al carrito
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Producto;
