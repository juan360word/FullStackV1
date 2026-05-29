
import { createBrowserRouter } from "react-router-dom";
import Layout from "./layouts/Layout";
import Productos from "./pages/Productos";
import NuevosProductos from "./pages/NuevosProductos";
import { action as newProducAction } from "./pages/NuevosProductos";


export const Router = createBrowserRouter([
    {
        path:'/',
        element: <Layout/>,
        children:[
            {
                index:true,
                element:<Productos/>
            },
            {
                path:'Productos/nuevos',
                element: <NuevosProductos/>,
                action: newProducAction
            }
        ]
    }
])

