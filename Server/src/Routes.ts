import { Router } from 'express'
import { createProductos,Delete,getProductos, getProductosID, updateAvilidato, UpdatePut } from './Backend/Handlers/Producto'
import { handleInputError } from './Backend/middleware/indexWare'
import { body, check, param } from 'express-validator'



const Route = Router()
/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The product ID
 *           example: 1
 *         name:
 *           type: string
 *           description: The product name
 *           example: Mouse rapido
 *         price:
 *           type: number
 *           description: The product price
 *           example: 4500
 */

/**
 * @swagger
 * /api/products:
 *      get:
 *          summary: Obtiene una lista de productos
 *          tags:
 *               - Api de productos
 *          description: esta api llamara a los productos
 *          responses:
 *              200:
 *                  description: llamado correcto
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Product'
 * 
 * 
 * 
 */

Route.get('/',getProductos)

/**
 * @swagger
 * /api/products/{id}:
 *          get:
 *              summary: Get al producto por ID
 *              tags:
 *                  - Api de productos
 *              description: Retornara un prodcuto basado en un indicador del ID    
 *              parameters:
 *                - in: path
 *                  name:   id
 *                  description: el id del producto
 *                  requiered: true
 *                  schema:
 *                          type: integer
 *              responses:
 *                  200:
 *                      description: 
 *                      content:
 *                              application/json:
 *                                  schema:
 *                                        $ref: '#/components/schemas/Product'
 *                  400:
 *                      description: Mal
 *                  404:
 *                      description: No exise
 * 
 * 
 * 
 * 
 * 
 */
Route.get('/:id',param('id').isInt().withMessage('ID no valido...'),handleInputError,getProductosID)


/**
 * @swagger
 * /api/products:
 *  post:
 *      summary: Creando nuevo producto
 *      tags:
 *      description: retorna un nuevo producto en la base de datos
 *      requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                                  schema:
 *                                         type: object
 *                                         properties:
 *                                              name:
 *                                                  type: string
 *                                                  example : "Monitor"   
 *                                              price:
 *                                                  type: number
 *                                                  example: 3400
 *      responses:
 *          201:
 *              description: producto creado perfectamente
 *          400:
 *              description: mal llamado - Error
 * 
 * 
 */

Route.post(
    '/',
    body('name')
        .notEmpty()
        .withMessage('El nombre es obligatorio'),

    body('price')
        .notEmpty()
        .withMessage('El precio es obligatorio')
        .isNumeric()
        .withMessage('El precio debe ser numerico')
        .custom(value => value > 0)
        .withMessage('Precio no valido'),

    handleInputError,

    createProductos
)



/**
 * @swagger
 * /api/products/{id}:
 *  put:
 *      summary : actualizacion del producto
 *      tags:
 *          -  Api de productos
 *      description: Retorna una actualizacion del producto
 *      parameters:
 *              - in: path
 *                name:   id
 *                description: el id del producto
 *                requiered: true
 *                schema:
 *                      type: integer      
 *      requestBody:
 *          required: true
 *          content:
 *                  application/json:
 *                                  schema:
 *                                         type: object
 *                                         properties:
 *                                              name:
 *                                                  type: string
 *                                                  example : "Monitor"   
 *                                              price:
 *                                                  type: number
 *                                                  example: 3400
 *                                              availability:
 *                                                  type: boolean
 *                                                  example: true
 *      responses:
 *          200:
 *              description: Respuesta correcta
 *              content:
 *                  application/json:
 *                                  schema:
 *                                       $ref: '#/components/schemas/Product'
 *              400:
 *                  description: Mal llamado 
 *                  404:
 *                      description: Producto no encontrado
 * 
 * 
 * 
 */

// el put siempre va con :id
Route.put(
    '/:id',

    param('id')
        .isInt()
        .withMessage('ID no valido...'),

    check('name')
        .notEmpty()
        .withMessage('Nombre obligatorio'),

    check('price')
        .isNumeric()
        .withMessage('Precio no valido'),

    handleInputError,

    UpdatePut
)


/**
 * @swagger
 * /api/products/{id}:
 *  patch:
 *      summary: Actualizacion del producto
 *      tags:
 *          - Api de productos
 *      description: retorna las actualizaciones validas
 *      parameters:
 *              - in: path
 *                name:   id
 *                description: el id del producto
 *                requiered: true
 *                schema:
 *                      type: integer     
 *      respones:
 *             200:
 *              description: Respuesta correcta
 *              content:
 *                  application/json:
 *                                  schema:
 *                                       $ref: '#/components/schemas/Product'
 *              400:
 *                  description: Mal llamado 
 *                  404:
 *                      description: Producto no encontrado
 *  
 * 
 * 
 * 
 * 
 */
Route.patch('/:id',param('id').isInt().withMessage('ID no valido...'),handleInputError,updateAvilidato)

/**
 * @swagger
 * /api/products/{id}:
 *  delete:
 *      summary: Eliminacion del producto
 *      tags:
 *          - Api de productos
 *      description: Se eliminan los productos que ya estan validos
 *      parameters:
 *              - in: path
 *                name:   id
 *                description: el id del producto
 *                requiered: true
 *                schema:
 *                      type: integer 
 *      respones:
 *             200:
 *              description: Respuesta correcta
 *              content:
 *                  application/json:
 *                                  schema:
 *                                       type: string
 *                                       value: 'Producto eliminado'
 *              400:
 *                  description: Mal llamado 
 *                  404:
 *                      description: Producto no encontrado
 *  
 */


Route.delete('/:id',param('id').isInt().withMessage('ID no valido...'),handleInputError,Delete)

export default Route