import { Link, useActionData, redirect, useLoaderData } from "react-router-dom"
import type { ActionFunctionArgs, LoaderFunctionArgs } from "react-router-dom"
import { Form } from "react-router-dom"
import ErrorMsg from "../components/ErrorMsg"
import {  DisponibilidadProducto, Eliminar, GetProductosID } from "../services/ProducoService"
import type { Producto } from "../types"
import { EditarProductoss } from "../services/ProducoService"
import Productos from "./Productos"

export async function Loader({ params }: LoaderFunctionArgs) {
    if (params.id !== undefined) {
        const pro = await GetProductosID(+params.id)
        if (!pro) {
            return redirect('/')
        }
        return pro
    }

}


export async function action({ request, params }: ActionFunctionArgs) {

    const formData = await request.formData()
    const data = Object.fromEntries(formData as any)

    let error = ''
    if (Object.values(data).includes('')) {
        error = "Todos los campos tienen que ir diligenciados "
    }

    if (error.length) {
        return error
    }

    if (params.id !== undefined) {
        await EditarProductoss(data,+params.id)
    }

    return redirect('/') //  siempre poner esto
}

export async function actionV2({ params }: ActionFunctionArgs){

    if (params.id !== undefined) {
       await  Eliminar(+params.id) 
    }

    return redirect('/')
}

export async function ActionDisponible({ request }: ActionFunctionArgs) {
    const formData = await request.formData()
    const data = Object.fromEntries(formData as any)
    await DisponibilidadProducto(+data.id)
    return null
}


const availabilityOptions = [
    { name: 'Disponible', value: true },
    { name: 'No Disponible', value: false }
]

const EditarProducto = () => {

    const error = useActionData()
    const producto = useLoaderData() as Producto



    return (
        <>


            <div className="flex justify-between">
                <h2 className=" text-3xl font-black text-slate-500">
                    Editar Producto
                </h2>
                <Link
                    to="/"
                    className="p-3 rounded-lg bg-emerald-500 text-white hover:bg-slate-700 hover:text-white"
                >
                    Volver a Productos
                </Link>
            </div>

            {error && <ErrorMsg>{error}</ErrorMsg>}

            <Form
                className="mt-10"
                method="POST"

            >

                <div className="mb-4">
                    <label
                        className="text-white"
                        htmlFor="name"
                    >Nombre Producto:</label>
                    <input
                        id="name"
                        type="text"
                        className="mt-2 block w-full p-3 bg-gray-50"
                        placeholder="Nombre del Producto"
                        name="name"
                        defaultValue={producto.name}

                    />
                </div>
                <div className="mb-4">
                    <label
                        className="text-white"
                        htmlFor="price"
                    >Precio:</label>
                    <input
                        id="price"
                        type="text"
                        className="mt-2 block w-full p-3 bg-gray-50"
                        placeholder="Precio Producto. ej. 20.000, 250.000"
                        name="price"
                        defaultValue={producto.price}
                        onChange={(e) => {
                            const valor = e.target.value.replace(/\D/g, '')
                            e.target.value = Number(valor).toLocaleString('es-CO')
                        }}
                    />
                </div>

                <div className="mb-4">
                    <label
                        className="text-white"
                        htmlFor="availability"
                    >Disponibilidad:</label>
                    <select
                        id="availability"
                        className="mt-2 block w-full p-3 bg-gray-50"
                        name="valido"
                        defaultValue={producto?.valido.toString()}
                    >
                        {availabilityOptions.map(option => (
                            <option key={option.name} value={option.value.toString()}>{option.name}</option>
                        ))}
                    </select>
                </div>

                <input
                    type="submit"
                    className="mt-5 w-full bg-emerald-500 p-2 text-white font-bold text-lg cursor-pointer rounded"
                    value="Guardar Cambio"
                />
            </Form>

        </>
    )
}

export default EditarProducto