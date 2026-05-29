import { exit } from "process";
import Database from "../Backend/Config/Mysql";

// Limpieza de la base de datos para que no tenga tanta basura
const clearDB = async () => {
    try {
       await  Database.sync({force:true})
       console.log('Datos eliminados .....')
       exit(0)
    } catch (error) {
        console.log(error)
        exit(1)
    }
}

if(process.argv[2] === '--clear'){
    clearDB()
}