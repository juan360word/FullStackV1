
import express from 'express'
import Route from './Routes';
import swaggerDocs, { swaggerUI } from './Backend/Config/Swagger';
import  SwaggerUiOptions  from 'swagger-ui-express';



const server = express();
server.use(express.json())
server.use('/api',Route)
server.use('/DocsInfo',SwaggerUiOptions.serve,SwaggerUiOptions.setup(swaggerDocs,swaggerUI))

export default server

