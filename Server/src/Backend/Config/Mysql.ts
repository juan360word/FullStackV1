
import {Sequelize} from 'sequelize-typescript'
import dotenv from 'dotenv'
import Productos from '../Models/Producto.model'
dotenv.config()



const Database = new Sequelize(process.env.URL_DATABASE_MYSQL!,{
    dialect:'mysql',
    logging:false,
    models:[Productos],
    dialectOptions:{
        charset:'utf8mb4'
     }

})

export default  Database
