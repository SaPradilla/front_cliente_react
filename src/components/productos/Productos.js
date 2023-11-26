import React from "react";
import { NavLink } from 'react-router-dom'
import clienteAxios from "../../config/axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

function Productos() {
    const [productos,datosProductos] = useState([]);
 

    const eliminarProducto = id =>{
        Swal.fire({
            title: "Estas Seguro?",
            text: "Esta accion borrará PARA SIEMPRE el Producto",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#66bb6a",
            cancelButtonColor: "#A01C48",
            confirmButtonText: "Si, Borrar!",
            cancelButtonText: "Cancelar"
          }).then((result) => {
            if (result.isConfirmed) {
                clienteAxios.delete(`/productos/${id}`)
                .then( res =>{
                    Swal.fire(
                        "Eliminado",
                        res.data.msg,
                        "success"
                      );
                })
             
            }
          });
    }

    const consultaApi = async () =>{
        const consultar = await clienteAxios.get('/productos')
        datosProductos(consultar.data)
    }
    useEffect(()=>{
        consultaApi()
    }, [productos]);
    return (
        <div>

            <h2>Productos</h2>
            <NavLink to="/nuevo-producto" className="btn btn-verde nvo-cliente">
                <i className="fas fa-plus-circle"></i>
                Nuevo Producto
            </NavLink>

            <ul className="listado-productos">
                {productos.map((producto, index) => (
                    <li className="producto" key={index}>
                        <div className="info-producto">
                            <p className="nombre">{producto.nombre}</p>
                            <p className="precio">{producto.precio}</p>
                            <img src={producto.imagen} alt={producto.nombre} />
                        </div>
                        <div className="acciones">
                            <NavLink to={`/editar-producto/${producto._id}`} className="btn btn-azul">
                                <i className="fas fa-pen-alt"></i>
                                Editar Producto
                            </NavLink>
                            <button type="button" className="btn btn-rojo btn-eliminar" onClick={() => eliminarProducto(producto._id)}>
                                <i className="fas fa-times"></i>
                                Eliminar Producto
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Productos