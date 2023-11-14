import React from "react";
import clienteAxios from "../../config/axios";
import { useNavigate,useParams} from "react-router-dom";
import { useState,useEffect } from "react";
import Swal from "sweetalert2";


function EditarProducto() {
    const navigate = useNavigate();
    const {id} = useParams();

    const [producto,datosProducto] = useState({
        nombre:'',
        precio:'',
        imagen:null
    });
    const actualizarState = (e) => {
        const { name, type } = e.target;
      
        if (type === 'file') {
          const nuevoArchivo = e.target.files[0];
      
          // Actualizar la visualización de la imagen localmente antes de subirla al servidor
          const reader = new FileReader();
          reader.onloadend = () => {
            datosProducto((prevProducto) => ({
              ...prevProducto,
            [name]: type === 'file' ? e.target.files[0] : e.target.value,
              imagenLocalUrl: reader.result, // Almacena la cadena base64 de la imagen local
            }));
          };
      
          if (nuevoArchivo) {
            reader.readAsDataURL(nuevoArchivo);
          }
        } else {
          datosProducto((prevProducto) => ({
            ...prevProducto,
            [name]: e.target.value,
          }));
        }
      };

    const actualizarProducto = async(a) =>{
        a.preventDefault()
        try{
            const formData = new FormData();
                formData.append('nombre', producto.nombre);
                formData.append('precio', producto.precio);
                formData.append('imagen', producto.imagen);
            
            const nuevoProducto = await clienteAxios.put(`/productos/${id}`,formData)
            
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
                "Se Actualizo Correctamente",
                nuevoProducto.data.msg,
                "success"
            )
            navigate('/productos')
        }catch(error){
            console.error('Error al agregar cliente:', error)

        }
    }
    useEffect(()=>{
        const consultaApi = async () =>{

            const consultar = await clienteAxios.get(`/productos/${id}`)
            datosProducto(consultar.data.Producto)
        }
        consultaApi()
    },[])
    return (
        <div>
            <h2>Editar Producto</h2>

            <form onSubmit={actualizarProducto} encType="multipart/form-data">
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input type="text" placeholder="Nombre Producto" name="nombre"  onChange={actualizarState} value={producto.nombre}/>
                </div>

                <div className="campo">
                    <label>Precio:</label>
                    <input type="number" name="precio" min="0.00" step="0.01" placeholder="Precio"  onChange={actualizarState} value={producto.precio}/>
                </div>

                <div className="campo">
                    <label>Imagen:</label>
                    <div className="contenedorUpdate">
                        {/* <img className="image-product" src={`http://localhost:7060/uploads/${producto.imagen}`} alt={producto.nombre} /> */}
                        {producto.imagenLocalUrl ? (
                            <img
                                className="image-product"
                                src={producto.imagenLocalUrl}
                                alt={producto.nombre}
                            />
                            ) : (
                            producto.imagen && (
                                <img
                                className="image-product"
                                src={`http://localhost:7060/uploads/${producto.imagen}`}
                                alt={producto.nombre}
                                />
                            )
                            )
                        }
                    </div>
                    <input type="file" name="imagen" onChange={actualizarState} />
                </div>  

                <div className="enviar">
                    <input type="submit"  className="btn btn-azul" value="Actualizar Producto"  />
                </div>
            </form>
        </div>
    )
}
export default EditarProducto