import React from "react";
import clienteAxios from "../../config/axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2";


function NuevoProducto() {
    const navigate = useNavigate();
    const [producto,guardarProducto] = useState({
        nombre:'',
        precio:'',
        imagen:null
    });
    const actualizarState = (e) => {
        const { name, type } = e.target;
      
        guardarProducto((prevProducto) => ({
          ...prevProducto,
          [name]: type === 'file' ? e.target.files[0] : e.target.value,
        }));
    };

    const validarForm = () =>{
        const {nombre,precio,imagen} = producto
        // let validacion = !nombre.length || !apellido.length || !empresa.length || !email.length || !telefono.length
        const validacionCampoVacio = [nombre,precio].some(campo => !campo.length);
        return validacionCampoVacio
    }

    const agregarProducto = async(a) =>{
        a.preventDefault()
        try{

            console.log(producto)
            const formData = new FormData();
            formData.append('nombre', producto.nombre);
            formData.append('precio', producto.precio);
            formData.append('imagen', producto.imagen);
            
            const nuevoProducto = await clienteAxios.post('/productos',formData)
            
            if (nuevoProducto.data.code === 11000) {
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
                nuevoProducto.data.msg,
                "success"
            )
            navigate('/productos')
        }catch(error){
            console.error('Error al agregar cliente:', error)

        }
    }
    
    return (
        <div>
            <h2>Nuevo Producto</h2>

            <form onSubmit={agregarProducto} encType="multipart/form-data">
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input type="text" placeholder="Nombre Producto" name="nombre"  onChange={actualizarState}/>
                </div>

                <div className="campo">
                    <label>Precio:</label>
                    <input type="number" name="precio" min="0.00" step="0.01" placeholder="Precio"  onChange={actualizarState} />
                </div>

                <div className="campo">
                    <label>Imagen:</label>
                    <input type="file" name="imagen" onChange={actualizarState} />
                </div>  

                <div className="enviar">
                    <input type="submit"  className="btn btn-azul" value="Agregar Producto" disabled = {validarForm()} />
                </div>
            </form>
        </div>
    )
}
export default NuevoProducto