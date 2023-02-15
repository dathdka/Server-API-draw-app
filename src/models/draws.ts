import { Table, Column, Model, DataType, HasMany } from "sequelize-typescript";
import { participants } from "./participants";
@Table({
    timestamps : false,
    tableName : "draws"
})
export class draws extends Model {

    @Column({
        type : DataType.STRING,
        allowNull: false,
        primaryKey : true,
    })
    id! : string

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    name!: string

    @Column({
        type: DataType.STRING
    })
    data! : string

    @HasMany(()=>participants)
    author! : participants[]
}