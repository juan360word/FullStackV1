import {safeParse} from 'valibot'
import { ProductosSchema, ProductosSchemaV2, ProductosSchemaV3, type Producto } from '../types'
import axios from 'axios'





type PropsProductoAdd = {
    [k: string]: any;
}

export async function addProducto(data: PropsProductoAdd) {
    try {
        const resultado = safeParse(ProductosSchema,{
            name: data.name,
            price: +data.price
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


export async function GetProductosID(id:Producto['id']) {
    try {
         const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
         const {data} = await axios(url)
         console.log(data)
         const Resultado = safeParse(ProductosSchemaV2,data.data)
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

export async function EditarProductoss(data: PropsProductoAdd, id: Producto['id']) {
    try {
        const url = (`${import.meta.env.VITE_API_URL}/api/products/${id}`)
        console.log('Enviando PUT:', url, data)
        await axios.put(url, {
            name: data.name,
            price: +data.price.replace(/\./g, ''),
            valido: data.valido === 'true'
        })
    } catch (error) {
        console.log(error)
        throw error
    }
}

export async function Eliminar(id: Producto['id']) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
        await axios.delete(url)
    } catch (error) {
        console.log(error)
        throw error
    }
}

export async function DisponibilidadProducto(id: Producto['id']) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
        await axios.patch(url)
    } catch (error) {
        console.log(error)
        throw error
    }
}
