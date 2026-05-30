import {object,string,number, boolean, type InferOutput, array, pipe, transform} from 'valibot'


export const ProductosSchema = object({
    name:string(),
    price:number()
})

export const ProductosSchemaV2 = object({
    id:number(),
    name:string(),
    price:pipe(string(), transform(Number)),
    valido:boolean()

})

export const ProductosSchemaV3 = array(ProductosSchemaV2)
export type Producto = InferOutput<typeof ProductosSchemaV2>
