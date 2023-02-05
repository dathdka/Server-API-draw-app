import { Table, Column, Length, Model, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import { users } from "./users";
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
        type: DataType.STRING
    })
    data! : string

    @ForeignKey(()=> users)
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    authorId! : string

    @BelongsTo(()=> users)
    user! : users
}