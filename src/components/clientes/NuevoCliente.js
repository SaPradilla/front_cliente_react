import React from "react";

function NuevoCliente () {
    return (
        <div>
            <h2>Nuevo Cliente</h2>
            <form action="/clientes" method="POST">
                <legend>Llena todos los campos</legend>

                <div class="campo">
                    <label>Nombre:</label>
                    <input type="text" placeholder="Nombre Cliente" name="nombre"/>
                </div>

                <div class="campo">
                    <label>Apellido:</label>
                    <input type="text" placeholder="Apellido Cliente" name="apellido"/>
                </div>
            
                <div class="campo">
                    <label>Empresa:</label>
                    <input type="text" placeholder="Empresa Cliente" name="empresa"/>
                </div>

                <div class="campo">
                    <label>Email:</label>
                    <input type="email" placeholder="Email Cliente" name="email"/>
                </div>

                <div class="campo">
                    <label>Teléfono:</label>
                    <input type="email" placeholder="Teléfono Cliente" name="telefono"/>
                </div>

                <div class="enviar">
                    <input type="submit" class="btn btn-azul" value="Agregar Cliente"/>
                </div>

            </form>
        </div>
    )
}

export default  NuevoCliente