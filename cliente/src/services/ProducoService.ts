import {safeParse} from 'valibot'
import { ProductosSchema, ProductosSchemaV2, ProductosSchemaV3 } from '../types'
import axios from 'axios'




type PropsProductoAdd = {
    [k: string]: any;
}

export async function addProducto(data: PropsProductoAdd) {
    try {
        const resultado = safeParse(ProductosSchema,{
            name: data.name,
            price: +data.price.replace(/\./g,'')
        })
    if(resultado.success){
        const url = `${import.meta.env.VITE_API_URL}/api/products`
        await axios.post(url,{
            name: resultado.output.name,
            price: resultado.output.price
        })
      
    }else{
        throw new Error('Datos no validos')
    }
        
    } catch (error) {
        console.log(error)
        throw error
    }
}


export async function GetProductos() {
    try {
         const url = `${import.meta.env.VITE_API_URL}/api/products`
         const {data} = await axios(url)
         console.log(data)
         const Resultado = safeParse(ProductosSchemaV3,data.data)
         if(Resultado.success){
            return Resultado.output
         }else{
            throw new Error('Esta teniendo un error...')
         }
    } catch (error) {
        console.log(error)
        return []
    }
}


