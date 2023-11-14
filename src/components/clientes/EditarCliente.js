import React from "react";
import { useNavigate,useParams } from "react-router-dom";
import { useState,useEffect } from "react";
import clienteAxios from "../../config/axios";
import Swal from "sweetalert2";


function EditarCliente () {
    const navigate = useNavigate();
    const {id} = useParams();
    const [cliente,datosCliente] = useState({
        nombre:'',
        apellido:'',
        empresa:'',
        email:'',
        telefono:'',
    });
    const actualizarState = a =>{
        
        datosCliente({
            // Copia del state
            ...cliente,
            [a.target.name] : a.target.value
        })
    }

    const actualizarCliente = async(e) =>{
        e.preventDefault()
        try{

            
            const nuevoCliente = await clienteAxios.put(`/clientes/${cliente._id}`,cliente)
            if (nuevoCliente.data.code === 11000) {
                Swal.fire({
                 type:'error',
                 title:'Hubo un Error :/',
                 text:'El cliente ya esta Registrado'
                })
                 return
            }
            Swal.fire(
                "Se Actualizo Correctamente",
                nuevoCliente.data.msg,
                "success"
            )
            console.log(nuevoCliente.data)
            navigate('/')
        }catch(error){
            console.log(`Error al actualizar : ${error}`)
        }
    }

   
   
    useEffect(()=>{
        const consultaApi = async () =>{

            const consultar = await clienteAxios.get(`/clientes/${id}`)
            datosCliente(consultar.data.Cliente)
        }
        consultaApi()
    },[id] )

    return (
        <div>
            <h2>Editar Cliente</h2>
            <form onSubmit={actualizarCliente}>
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input type="text" placeholder="Nombre Cliente" name="nombre" onChange={actualizarState} value={cliente.nombre}/>
                </div>

                <div className="campo">
                    <label>Apellido:</label>
                    <input type="text" placeholder="Apellido Cliente" name="apellido" onChange={actualizarState} value={cliente.apellido}/>
                </div>
            
                <div className="campo">
                    <label>Empresa:</label>
                    <input type="text" placeholder="Empresa Cliente" name="empresa" onChange={actualizarState} value={cliente.empresa}/>
                </div>

                <div className="campo">
                    <label>Email:</label>
                    <input type="email" placeholder="Email Cliente" name="email" onChange={actualizarState} value={cliente.email}/>
                </div>

                <div className="campo">
                    <label>Teléfono:</label>
                    <input type="number" placeholder="Teléfono Cliente" name="telefono" onChange={actualizarState} value={cliente.telefono}/>
                </div>

                <div className="enviar">
                    <input type="submit" className="btn btn-azul" value="Actualizar Cliente"/>
                </div>

            </form>
        </div>
    )
}

export default EditarCliente