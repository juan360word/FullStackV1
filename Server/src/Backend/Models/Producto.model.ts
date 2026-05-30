
import { Table,Column,Model,DataType,Default} from 'sequelize-typescript'


@Table({
    tableName:'Productos',
    timestamps:false
})

class Productos extends Model{
    @Column({
        type:DataType.STRING(100)
    })
    declare name:String

    @Column({
        type:DataType.DECIMAL(10,2)
    })
    declare price:number
    @Default(true)

    @Column({
        type:DataType.BOOLEAN
    })
            valido:boolean
}

export default Productos