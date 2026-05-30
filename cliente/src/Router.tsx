
import { createBrowserRouter } from "react-router-dom";
import Layout from "./layouts/Layout";
import Productos from "./pages/Productos";
import NuevosProductos from "./pages/NuevosProductos";
import { action as newProducAction } from "./pages/NuevosProductos";
import { Loader as ProductoLoader } from "./pages/Productos";

export const Router = createBrowserRouter([
    {
        path:'/',
        element: <Layout/>,
        children:[
            {
                index:true,
                element:<Productos/>,
                loader: ProductoLoader
            },
            {
                path:'Productos/nuevos',
                element: <NuevosProductos/>,
                action: newProducAction
            }
        ]
    }
])

