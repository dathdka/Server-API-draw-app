import { Table, Column, DataType, Model, Length, HasMany } from "sequelize-typescript";
import { participants } from "./participants";

@Table({
  timestamps: false,
  tableName: "users",
})
export class users extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
    primaryKey: true,
    unique : true
  })
  id!: string;

  @Length({min : 6, max :35})
  @Column({
    type: DataType.STRING,
    allowNull : false,
    validate: {
      notEmpty : true,
      isEmail : true,
    },
    unique : true
  })
  email!: string

  @Length({min: 6,max : 20})
  @Column({
    type: DataType.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    },
  })
  username!: string;

  @Length({min : 6,max:100})
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password!: string;

  @HasMany(()=>participants)
  collection! : participants[]
}
