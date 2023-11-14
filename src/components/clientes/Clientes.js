import React from "react";
import clienteAxios from "../../config/axios";
import { NavLink } from 'react-router-dom'
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

function Clientes() {
    const [clientes,datosCliente] = useState([]);

    const eliminarCliente = id =>{
        Swal.fire({
            title: "Estas Seguro?",
            text: "Esta accion borrará PARA SIEMPRE el cliente",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#66bb6a",
            cancelButtonColor: "#A01C48",
            confirmButtonText: "Si, Borrar!",
            cancelButtonText: "Cancelar"
          }).then((result) => {
            if (result.isConfirmed) {
                clienteAxios.delete(`/clientes/${id}`)
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
        const consultar = await clienteAxios.get('/clientes')
        datosCliente(consultar.data)
    }
    useEffect(()=>{
        consultaApi()
    }, [clientes]);
    return (
        <div>
            <h2>Clientes</h2>
            <NavLink to="/nuevo-cliente" className="btn btn-verde nvo-cliente">
                <i className="fas fa-plus-circle"></i>
                Nuevo Cliente
            </NavLink>

            <ul className="listado-clientes">
                {clientes.map((cliente, index) => (
                    <li className="cliente" key={index}>
                        <div className="info-cliente">
                            <p className="nombre">{cliente.nombre}</p>
                            <p className="empresa">{cliente.empresa}</p>
                            <p>{cliente.correo}</p>
                            <p>Tel: {cliente.telefono}</p>
                        </div>
                        <div className="acciones">
                            <NavLink to={`/editar-cliente/${cliente._id}`} className="btn btn-azul">
                                <i className="fas fa-pen-alt"></i>
                                Editar Cliente
                            </NavLink>
                            <button type="button" className="btn btn-rojo btn-eliminar" onClick={() => eliminarCliente(cliente._id)}>
                                <i className="fas fa-times"></i>
                                Eliminar Cliente
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Clientes