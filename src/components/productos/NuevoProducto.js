import React from "react";

function NuevoProducto() {
    return (
        <div>
            <h2>Nuevo Producto</h2>

            <form action="/productos" method="POST">
                <legend>Llena todos los campos</legend>

                <div class="campo">
                    <label>Nombre:</label>
                    <input type="text" placeholder="Nombre Producto" name="nombre"/>
                </div>

                <div class="campo">
                    <label>Precio:</label>
                    <input type="number" name="precio" min="0.00" step="0.01" placeholder="Precio" />
                </div>

                <div class="campo">
                    <label>Imagen:</label>
                    <input type="file" name="imagen" />
                </div>

                <div class="enviar">
                    <input type="submit" class="btn btn-azul" value="Agregar Producto"/>
                </div>
            </form>
        </div>
    )
}
export default NuevoProducto