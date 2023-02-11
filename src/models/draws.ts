import { Table, Column, Model, DataType, HasMany } from "sequelize-typescript";
import { draw_details } from "./draw_details";
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

    @HasMany(()=>draw_details)
    author! : draw_details[]
}