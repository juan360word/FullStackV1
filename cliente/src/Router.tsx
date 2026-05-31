
import { createBrowserRouter } from "react-router-dom";
import Layout from "./layouts/Layout";
import Productos from "./pages/Productos";
import NuevosProductos from "./pages/NuevosProductos";
import { action as newProducAction } from "./pages/NuevosProductos";
import { Loader as ProductoLoader } from "./pages/Productos";
import EditarProducto, { actionV2 as Eliminar } from "./pages/EditarProducto";
import { Loader as EditarProductos,action as editarAction } from "./pages/EditarProducto";
import { ActionDisponible as Disponible } from "./pages/EditarProducto";
export const Router = createBrowserRouter([
    {
        path:'/',
        element: <Layout/>,
        children:[
            {
                index:true,
                element:<Productos/>,
                loader: ProductoLoader,
                action: Disponible
            },
            {
                path:'Productos/nuevos',
                element: <NuevosProductos/>,
                action: newProducAction
            },
            {
                path:'Productos/:id/editar', // esta es el ROA Pattern
                element:<EditarProducto/>,
                loader: EditarProductos,
                action: editarAction
                
            },
            {
              path:'Productos/:id/eliminar',
              action: Eliminar  
            }
        ]
    }
])

