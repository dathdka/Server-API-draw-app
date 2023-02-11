import { Table, Model, Column, Length, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import { users } from "./users";
import { draws } from "./draws";
@Table({
    timestamps: false,
    tableName : `draw_details`
})
export class draw_details extends Model {

    @Column({
        type: DataType.STRING,
        allowNull: false,
        primaryKey: true
    })
    id!: string

    @ForeignKey(()=> users)
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    authorId! : string

    @ForeignKey(()=> draws)
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    drawId! : string

    @BelongsTo(()=> users)
    user! : users
    @BelongsTo(()=>draws)
    draw! : draws
}