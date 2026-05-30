
import dotenv from 'dotenv'
dotenv.config()  

import express from 'express'
import Route from './Routes';
import swaggerDocs, { swaggerUI } from './Backend/Config/Swagger';
import  SwaggerUiOptions  from 'swagger-ui-express';
import cors,{CorsOptions} from 'cors';
import { ConexionDB } from './Backend/Config/ConexionBD';
import morgan from 'morgan'


ConexionDB()
const server = express();
server.use(express.json())
server.use(morgan('dev'))
//permitir la conexion
const corsOptions : CorsOptions = {
    origin: function(origin,callback) {
        console.log('lamando a origni',origin)
        if(!origin || origin === process.env.FRONTEND_URL){
            console.log('Permitiendo entrada..')
            callback(null, true)   
    }else{
       console.log('no se permite la entrada..') 
       callback(new Error('No permitido por cors'))   
    }
}}

server.use(cors(corsOptions))

server.use('/api/products',Route)
server.use('/DocsInfo',SwaggerUiOptions.serve,SwaggerUiOptions.setup(swaggerDocs,swaggerUI))

export default server

