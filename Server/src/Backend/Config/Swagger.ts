
import swaggerJSDoc from "swagger-jsdoc"
import { SwaggerUiOptions } from "swagger-ui-express"

const opciones : swaggerJSDoc.Options = {
    definition : {
        openapi: '3.0.0',
        tags:[{
            name:'Api de productos',
            description: 'Se realizo el llamado de una api creada por nosotros mismos y el cual se conecto a la base de datos'
        }],
        info: {
            title : 'Api con conexion a Mysql',
            version: '1.0',
            description: 'Primer llamado a api y a un trabajo Fullstack'
        },
       
    } ,
    apis : ['./src/Routes.ts'] 
}
const swaggerDocs = swaggerJSDoc(opciones)
const swaggerUI : SwaggerUiOptions = {
    customSiteTitle: 'Documentacion de la Api'
}


export default swaggerDocs
export {
    swaggerUI
}


