import React from 'react';
import { Fragment } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// Componentes
import Header from './components/layout/Header';
import NavBar from './components/layout/BarraNavegacion';
import Clientes from './components/clientes/Clientes';
import NuevoCliente from './components/clientes/NuevoCliente';
import Pedidos from './components/pedidos/Pedidos';
import Productos from './components/productos/Productos';
import NuevoProducto from './components/productos/NuevoProducto';


function App() {
  return (
    <Router>
    <Fragment>
      <Header/>
      <div className='grid contenedor contenido-principal'>
        <NavBar/>
        <main className="caja-contenido col-9">
          <Routes>
          <Route exact path="/" element={<Clientes />}/>
          <Route exact path="/nuevo-cliente" element={<NuevoCliente />}/>
            
          
          <Route exact path="/pedidos" element={<Pedidos />}/>
            
        
          <Route exact path="/productos" element={<Productos />}/>
          <Route exact path="/nuevo-producto" element={<NuevoProducto />}/>

         
          </Routes>
        </main>
      </div>
    </Fragment>
    </Router>
 );
}

export default App;
