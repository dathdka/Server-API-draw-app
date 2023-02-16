import { Table, Model, Column, Default, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import { users } from "./users";
import { draws } from "./draws";
@Table({
    timestamps: false,
    tableName : `participants`
})
export class participants extends Model {

    @Column({
        type: DataType.STRING,
        allowNull: false,
        primaryKey: true
    })
    id!: string

    @Default(false)
    @Column({
        type : DataType.BOOLEAN
    })
    pending? : boolean

    @Column({
        type : DataType.STRING
    })
    sender? : string 

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