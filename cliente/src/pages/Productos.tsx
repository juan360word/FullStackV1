import { Link, useLoaderData } from "react-router-dom"
import { GetProductos } from "../services/ProducoService"
import type { Producto } from "../types"
import DetallesProductos from "../components/DetallesProductos"



export async function Loader() {
  const Producto = await GetProductos()
  return Producto
}

const Productos = () => {

  const Producto = useLoaderData() as Producto[]
  console.log(Producto)


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


      <div className="p-2">
        <table className="w-full mt-5 table-auto">
          <thead className="bg-slate-800 text-white">
            <tr>
              <th className="p-2">Producto</th>
              <th className="p-2">Precio</th>
              <th className="p-2">Disponibilidad</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
          {Producto.map((item) => (
            <DetallesProductos
              key={item.id}
              producto={item}
            />
          ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Productos