import React from "react";
import clienteAxios from "../../config/axios";
import { useNavigate,useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import Select from 'react-select';

function EditarPedido() {
    const navigate = useNavigate();
    const {id} = useParams();

    const [pedido, datosPedido] = useState({
        cliente: '',
        pedido: [],
        total: null
    });
    const [clienteAnterior,datosClienteAnterior] = useState({})
    // const [nuevoPedido,guardarNuevoPedido] = useState({
    //     cliente: '',
    //     productos: [],
    //     total: null
    // })
    
    const [clientes, datosCliente] = useState([]);
    
    const [productos, datosProductos] = useState([]);
    
    const [productosDisponibles,datosProductosDisponibles] = useState([])

    const validarDisponibles = () =>{
        const productosDisponibles = productos.filter((producto) => {
            // Verificar si el producto no está en el array de pedido.pedido
            const noEstaEnPedido = !pedido.pedido.some((productoPedido) => productoPedido.nombre === producto.nombre);
            
            return noEstaEnPedido;
          });
        
          datosProductosDisponibles(productosDisponibles);
    }

    const actualizarState = a => {
        const { name, value } = a.target;
        datosPedido({
            // Copia del state
            ...pedido,
            [name]: value,

        })
    }
    const handleProductosChange = (selectedOptions) => {
        datosPedido({
            ...pedido,
            pedido: selectedOptions.map((producto) => ({
                ...producto,
                cantidad: 1, // Inicializamos la cantidad en 1 por defecto
            })),
        });
    };
    const handleCantidadChange = (index, cantidad) => {
        const nuevosProductos = [...pedido.productos];
        nuevosProductos[index].cantidad = cantidad;
        datosPedido({
            ...pedido,
            productos: nuevosProductos,
        });
    };

    const calcularTotal = () => {
        const total = pedido.pedido.reduce(
            (acumulador, producto) => acumulador + producto.cantidad * producto.precio,
            0
        );
        datosPedido({
            ...pedido,
            total,
        });
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

    const consultar= async () => {

        const productosApi = await clienteAxios.get('/productos')
        datosProductos(productosApi.data)

        const clientesApi = await clienteAxios.get('/clientes')
        datosCliente(clientesApi.data)

        const pedidoApi = await clienteAxios.get(`/pedidos/${id}`)

        const productosPedidoFormat = pedidoApi.data.Pedido.pedido.map((productoPedido) => ({
            value: productoPedido.producto._id,
            label: `${productoPedido.producto.nombre} $${productoPedido.producto.precio}`,
            cantidad: productoPedido.cantidad,
          }));
          
          datosPedido({
            ...pedidoApi.data.Pedido,
            pedido: productosPedidoFormat,
          });

          datosClienteAnterior(pedidoApi.data.Pedido.cliente)

        // console.log(pedidoApi.data)
        console.log(pedido)
        console.log(productosApi.data)

    }


    useEffect(() => {
        consultar()
        validarDisponibles()
    }, []);

    // useEffect(()=>{
    //     const consultaApi = async () =>{
    //         const consultar = await clienteAxios.get(`/pedidos/${id}`)
    //         datosPedido(consultar.data.Pedido)
    //     }
    //     consultaApi()
    // },[])
    useEffect(() => {
        calcularTotal();
    }, [pedido.pedido]);
    return (
        <div>
            <h2>Editar Pedido</h2>

            <form onSubmit={agregarPedido}>
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <div>
                        
                        <label>Cliente:</label>
                    
                        <select name="cliente">
   
                            <option selected value="" disabled>
                                {`${clienteAnterior.nombre} `}  {`${clienteAnterior.apellido} `}
                            </option>
                                
                        </select>
                    </div>
                    <div>
                        
                        <label>Nuevo Cliente:</label>

                        <select value={pedido.cliente} onChange={actualizarState} name="cliente">
                            <option value="">-- Seleccione --</option>
                            {clientes.map((cliente) => (
                                <option key={cliente._id} value={cliente._id}>
                                    {cliente.nombre} {cliente.apellido}
                                </option>
                            ))}
                        </select>
                    </div>
                    
                    
                </div>
                <div className="campo">
                    <label>Producto:</label>
                
                    <Select
                        options={
                            productos.map((producto) => ({
                            value: producto._id,
                            label: `${producto.nombre} $${producto.precio}`,
                            precio: producto.precio,
                        }))}

                        value={pedido.pedido}
                        onChange={handleProductosChange}
                        isMulti
                    />

                </div>
                {pedido.pedido.map((producto, index) => (
                <div key={index} className="campo">
                    <label>Cantidad para {producto.label}:</label>
                    <input
                    type="number"
                    value={producto.cantidad}
                    onChange={(e) => handleCantidadChange(index, e.target.value)}
                    />
                </div>
                ))}
                {/* <div className="campo">
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
                    {pedido.pedido.producto.map((producto, index) => (
                        <div key={index} className="campo">
                            <label>Cantidad para {producto.label}:</label>
                            <input
                                type="number"
                                value={producto.cantidad}
                                onChange={(e) => handleCantidadChange(index, e.target.value)}
                            />
                        </div>
                    ))} */}
                <div className="campo">
                    <label>Total:</label>
                    {/* <input type="number" name="total" value={pedido.total || ''} readOnly /> */}
                </div>

                <div className="enviar">
                    <input type="submit" className="btn btn-azul" value="Agregar Producto" />
                </div>
            </form>
        </div>
    )
}
export default EditarPedido