
import {Request,Response} from 'express'
import { check} from 'express-validator'
import Productos from '../Models/Producto.model'
import { error } from 'console'



export const getProductos =  async (req:Request,res:Response) => {
    
    try {
        const Producto = await Productos.findAll({
            order:[
                [ 'id','DESC']
              
            ], attributes:{exclude:['createAt','updatedAt']}
        })
        res.json({data:Producto})
    } catch (error) {
        
    }
}

export const getProductosID = async (req:Request,res:Response) => {
    
    try {
       const {id} = req.params
       const Producto = await Productos.findByPk(id)
       if(!Producto){
        return res.status(404).json({
            error:'Producto no encontrado'
        })
       }
        res.json({data:Producto})
    } catch (error) {
       
    }
    
}


export  const createProductos = async (req: Request,res: Response) => {
    
    // Validacion

    await check('name').notEmpty().withMessage('Ingrese algo , No puede ir vacio ').run(req)
    await check('Price').isNumeric().withMessage('Tiene que ir un numero')
                        .notEmpty().withMessage('Ingrese algo , No puede ir vacio ')
                        .custom(value => value > 0).withMessage('No puede ir negativo')
                        .run(req)


    try {
        const Producto = await Productos.create(req.body)
          res.status(201).json({data: Producto})
    } catch (error) {
        
    }
  
}

export const UpdatePut = async (req: Request,res: Response) => {
    const {id} = req.params
       const Producto = await Productos.findByPk(id)
       if(!Producto){
        return res.status(404).json({
            error:'Producto no encontrado....'
        })
    }
    // Se actualiza
    await Producto.update(req.body)
    await Producto.save()
    res.json({data:Producto})
}

export const updateAvilidato = async (req: Request,res: Response) => {
    const {id} = req.params
       const Producto = await Productos.findByPk(id)
       if(!Producto){
        return res.status(404).json({
            error:'Producto no encontrado....'
        })
    }
    // Se actualiza
    Producto.valido = !Producto.dataValues.valido
    await Producto.save()
    res.json({data:Producto})
}
export const Delete = async (req: Request,res: Response ) => {
    const {id} = req.params
       const Producto = await Productos.findByPk(id)
       if(!Producto){
        return res.status(404).json({
            error:'Producto no encontrado....'
        })
    }
    // es para elimianr de la base de datos 
    await Producto.destroy()
    res.json({data:"Producto eliminado"})

}