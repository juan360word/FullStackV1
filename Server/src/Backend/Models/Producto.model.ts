
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
        type:DataType.DECIMAL(4,2)
    })
    declare Price:number
    @Default(true)

    @Column({
        type:DataType.BOOLEAN
    })
            valido:boolean
}

export default Productos