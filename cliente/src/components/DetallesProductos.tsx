import  type { Producto } from "../types"

type DetallesProductosProps = {
    producto: Producto
}



const DetallesProductos = ({producto} : DetallesProductosProps) => {

    const Validacion = producto.valido

  return (
    
    <>
    
    <tr className="border-b text-center ">
        <td className="p-3 text-lg text-white">
            {producto.name}
        </td>
        <td className="p-3 text-lg text-white">
            ${producto.price}
        </td>
        <td className="p-3 text-lg text-white">
            {Validacion ? 'Esta Disponible' : 'No esta diponible'}
        </td>
        <td className="p-3 text-lg text-white">
           
        </td>
    </tr> 

    </>
  )
}

export default DetallesProductos