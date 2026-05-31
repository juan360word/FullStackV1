import type { Producto } from "../types"
import { Form, useFetcher, useNavigate } from "react-router-dom"


type DetallesProductosProps = {
    producto: Producto
}



const DetallesProductos = ({ producto }: DetallesProductosProps) => {

    const Validacion = producto.valido
    const navigate = useNavigate()
    const fetcher = useFetcher()

    return (

        <>

            <tr className="border-b text-center ">
                <td className="p-3 text-lg text-white">
                    {producto.name}
                </td>
                <td className="p-3 text-lg text-white">
                    ${producto.price.toLocaleString('es-CO')}
                </td>
                <td className="p-3 text-lg text-white">
                    <fetcher.Form method="POST">
                        <button
                            type="submit"
                            name="valido"
                            value={producto.valido.toString()}
                            className=" uppercase border p-2 rounded-xl w-full cursor-pointer"
                        >
                            {Validacion ? 'Esta Disponible' : 'No esta disponible'}
                        </button>
                        <input type="hidden" name='id' value={producto.id} />
                    </fetcher.Form>

                </td>
                <td className="p-3 text-lg text-white">
                    <div className="flex gap-2 ">
                        <button className="bg-emerald-500 rounded-xl hover:bg-emerald-800 w-full p-2 cursor-pointer text-white"
                            onClick={() => navigate(`Productos/${producto.id}/editar`)}>
                            Editar
                        </button>

                        <Form
                            className="w-full"
                            method="POST"
                            action={`Productos/${producto.id}/eliminar`}
                            onSubmit={(e) => {
                                if (!confirm('Deseas Eliminar?')) {
                                    e.preventDefault()
                                }
                            }}
                        >

                            <input type="submit" value="Eliminar"
                                className="bg-slate-800 rounded-xl hover:bg-red-800 w-full p-2 cursor-pointer text-white"
                            />
                        </Form>
                    </div>
                </td>
            </tr>

        </>
    )
}

export default DetallesProductos