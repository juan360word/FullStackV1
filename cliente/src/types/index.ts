import {object,string,number} from 'valibot'


export const ProductosSchema = object({
    name:string(),
    price:number()
})
