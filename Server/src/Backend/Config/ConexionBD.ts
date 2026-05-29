import Database from "./Mysql"

// Se coloco la conexion de la base de datos en archivo separado para que
// no molestara en en llamado del test
export async function ConexionDB() {
    try {
        await Database.authenticate()
        console.log('DB conectada')
    } catch (error) {
        console.log(error.message)
    }
}

ConexionDB()