import React from "react";
import clienteAxios from "../../config/axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import Select from 'react-select';

function NuevoPedido() {
    const navigate = useNavigate();
    const [pedido, guardarPedido] = useState({
        cliente: '',
        productos: [],
        total: null
    });
    const [clientes, datosCliente] = useState([]);
    const [productos, datosProductos] = useState([]);

    const actualizarState = a => {
        const { name, value } = a.target;
        guardarPedido({
            // Copia del state
            ...pedido,
            [name]: value,

        })
    }
    const handleProductosChange = (selectedOptions) => {
        guardarPedido({
            ...pedido,
            productos: selectedOptions.map((producto) => ({
                ...producto,
                cantidad: 1,
            })),
        });
    };
    const handleCantidadChange = (index, cantidad) => {
        const nuevosProductos = [...pedido.productos];
        nuevosProductos[index].cantidad = cantidad;
        guardarPedido({
            ...pedido,
            productos: nuevosProductos,
        });
    };

    const calcularTotal = () => {
        const total = pedido.productos.reduce(
            (acumulador, producto) => acumulador + producto.cantidad * producto.precio,
            0
        );
        guardarPedido({
            ...pedido,
            total,
        });
    };
    const validarForm = () => {
        const { cliente, productos } = pedido;
        const validacionCampoVacio = cliente === "" || productos.length === 0;
        return validacionCampoVacio;
    };

    const agregarPedido = async (a) => {
        a.preventDefault()

        try {
            // Convertir la lista de productos formateados a una cadena JSON
            // const productosJSON = JSON.stringify(productosData);
            
            const productosData = pedido.productos.map((producto) => ({
                producto: producto.value,
                cantidad: producto.cantidad,
            }));
            const pedidoData = {
                cliente: pedido.cliente,
                pedido: productosData,
                total: pedido.total
            }
            console.log(pedidoData)
            const nuevoPedido = await clienteAxios.post('/pedidos', pedidoData)

            console.log(nuevoPedido.data.Pedido)
            if (nuevoPedido.data.code === 11000) {
                Swal.fire({
                    icon: "error",
                    title: 'Hubo un Error :/',
                    text: 'El cliente ya esta Registrado',
                    timer: 1500,
                    confirmButtonColor: "#66bb6a",

                })
                return
            }
            Swal.fire(
                "Se Creo Correctamente",
                nuevoPedido.data.msg,
                "success"
            )
            navigate('/pedidos')
        } catch (error) {

        }
    }

    const consultarClientes = async () => {
        const clientesApi = await clienteAxios.get('/clientes')
        datosCliente(clientesApi.data)
        const pedidosApi = await clienteAxios.get('/productos')
        datosProductos(pedidosApi.data)
    }


    useEffect(() => {
        consultarClientes()
    }, []);

    useEffect(() => {
        calcularTotal();
    }, [pedido.productos]);
    return (
        <div>
            <h2>Nuevo Pedido</h2>

            <form onSubmit={agregarPedido}>
                <legend>Llena todos los campos</legend>

                <div className="campo">

                    <label>Cliente:</label>

                    <select value={pedido.cliente} onChange={actualizarState} name="cliente">
                        <option value="">-- Seleccione --</option>
                            {clientes.map((cliente) => (
                                <option key={cliente._id} value={cliente._id}>
                                    {cliente.nombre} {cliente.apellido}
                                </option>
                            ))}

                    </select>
                </div>

                <div className="campo">
                    <label>Producto:</label>

                    <Select
                        options={productos.map((producto) => ({
                            value: producto._id,
                            label: `${producto.nombre} $${producto.precio}`,
                            precio: producto.precio,
                        }))}
                        value={pedido.productos}
                        onChange={handleProductosChange}
                        isMulti
                    />
                </div>
                    {pedido.productos.map((producto, index) => (
                    <div key={index} className="campo">
                        <label>Cantidad para {producto.label}:</label>
                        <input
                            type="number"
                            value={producto.cantidad}
                            onChange={(e) => handleCantidadChange(index, e.target.value)}
                        />
                    </div>
                ))}
                <div className="campo">
                    <label>Total:</label>
                    <input type="number" name="total" value={pedido.total || ''} readOnly />
                </div>

                <div className="enviar">
                    <input type="submit" className="btn btn-azul" value="Agregar Pedido" disabled={validarForm()} />
                </div>
            </form>
        </div>
    )
}
export default NuevoPedido