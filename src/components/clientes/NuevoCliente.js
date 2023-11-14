import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import clienteAxios from "../../config/axios";
import Swal from "sweetalert2";


function NuevoCliente () {
    const navigate = useNavigate();

    const [cliente,guardarCliente] = useState({
        nombre:'',
        apellido:'',
        empresa:'',
        email:'',
        telefono:'',
    });
    const actualizarState = a =>{
        
        guardarCliente({
            // Copia del state
            ...cliente,
            [a.target.name] : a.target.value
        })
    }
    const validarForm = () =>{
        const {nombre,apellido,empresa,email,telefono} = cliente
        // let validacion = !nombre.length || !apellido.length || !empresa.length || !email.length || !telefono.length
        const validacionCampoVacio = [nombre, apellido, empresa, email, telefono].some(campo => !campo.length);
        return validacionCampoVacio
    }
    
    const agregarCliente = async (a) => {
        a.preventDefault()
    
        try {
            const nuevoCliente = await clienteAxios.post('/clientes', cliente)
    
            if (nuevoCliente.data.code === 11000) {
               Swal.fire({
                icon: "error",
                title:'Hubo un Error :/',
                text:'El cliente ya esta Registrado',
                timer: 1500,
                confirmButtonColor: "#66bb6a",
                
               })
                return
            }
            Swal.fire(
                "Se Añadio Correctamente",
                nuevoCliente.data.msg,
                "success"
            )
            console.log(nuevoCliente.data)
            navigate('/')
        } catch (error) {
            console.error('Error al agregar cliente:', error)
        }
    };
    return (
        <div>
            <h2>Nuevo Cliente</h2>
            <form onSubmit={agregarCliente}>
                <legend>Llena todos los campos</legend>

                <div class="campo">
                    <label>Nombre:</label>
                    <input type="text" placeholder="Nombre Cliente" name="nombre" onChange={actualizarState}/>
                </div>

                <div class="campo">
                    <label>Apellido:</label>
                    <input type="text" placeholder="Apellido Cliente" name="apellido" onChange={actualizarState} />
                </div>
            
                <div class="campo">
                    <label>Empresa:</label>
                    <input type="text" placeholder="Empresa Cliente" name="empresa" onChange={actualizarState}/>
                </div>

                <div class="campo">
                    <label>Email:</label>
                    <input type="email" placeholder="Email Cliente" name="email" onChange={actualizarState}/>
                </div>

                <div class="campo">
                    <label>Teléfono:</label>
                    <input type="number" placeholder="Teléfono Cliente" name="telefono" onChange={actualizarState}/>
                </div>

                <div class="enviar">
                    <input type="submit" class="btn btn-azul" value="Agregar Cliente" disabled = {validarForm()}/>
                </div>

            </form>
        </div>
    )
}

export default  NuevoCliente