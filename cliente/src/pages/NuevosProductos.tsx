
import { Link, useActionData ,redirect} from "react-router-dom"
import type { ActionFunctionArgs } from "react-router-dom"
import { Form } from "react-router-dom"
import ErrorMsg from "../components/ErrorMsg"
import { addProducto } from "../services/ProducoService"


export async function action({request}: ActionFunctionArgs) {

    const formData = await request.formData()
    const data = Object.fromEntries(formData as any)

    let error = ''
    if(Object.values(data).includes('')){
        error = "Todos los campos tienen que ir diligenciados "
    }

    if(error.length){
        return error
    }

   await addProducto(data)
    return redirect('/') //  siempre poner esto
}


const NuevosProductos = () => {

    const error = useActionData()
    console.log(error)


    return (
        <>


            <div className="flex justify-between">
                <h2 className=" text-3xl font-black text-slate-500">
                    Registrar Producto
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
                    />
                </div>
                <div className="mb-4">
                    <label
                        className="text-white"
                        htmlFor="price"
                    >Precio:</label>
                    <input
                        id="price"
                        type="number"
                        className="mt-2 block w-full p-3 bg-gray-50"
                        placeholder="Precio Producto. ej. 20.000, 250.000"
                        name="price"
                        
                    />
                </div>
                <input
                    type="submit"
                    className="mt-5 w-full bg-emerald-500 p-2 text-white font-bold text-lg cursor-pointer rounded"
                    value="Registrar Producto"
                />
            </Form>

        </>
    )
}

export default NuevosProductos