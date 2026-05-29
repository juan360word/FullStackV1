import {safeParse} from 'valibot'
import { ProductosSchema } from '../types'


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
        
    }else{
        throw new Error('Datos no validos')
    }
        
    } catch (error) {
        
    }
}