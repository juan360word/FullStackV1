import { Link} from "react-router-dom"
import { GetProductos } from "../services/ProducoService"

export async function Loader() {
  
  await GetProductos()

  return null
}

const Productos = () => {
  return (
    <>
        <div className="flex justify-between">
                <h2 className=" text-3xl font-black text-slate-500">
                    Productos
                </h2>
                <Link
                    to="Productos/nuevos"
                    className="p-3 rounded-lg bg-emerald-500 text-white hover:bg-slate-700 hover:text-white"
                >
                    Agregar Producto
                </Link>
        </div>
    </>
  )
}

export default Productos