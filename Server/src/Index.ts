import server from "./Server";
import Database from '../src/Backend/Config/Mysql';
import './Backend/Models/Producto.model'
import 'reflect-metadata'


const port = process.env.PORT || 3689;
// Conexion a la base de datos + Error


server.listen(port,() => {
    console.log("servidor corriendo..",port)
})



