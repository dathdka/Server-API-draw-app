import { Table,Model, Column, DataType } from "sequelize-typescript";

@Table({
    timestamps: false, 
    tableName: `items` 
})

export class items extends Model{
    @Column({
        type: DataType.INTEGER,
        allowNull : false,
        autoIncrement : true,
        primaryKey: true
    })
    id!: string;

    @Column ({
        type: DataType.STRING,
        allowNull : false,
    }) 
    name!: string
}