import { Table, Column, DataType, Model, Length } from "sequelize-typescript";

@Table({
  timestamps: false,
  tableName: "users",
})
class users extends Model<users> {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
  })
  id!: string;

  @Length({min: 6,max : 20})
  @Column({
    type: DataType.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
    unique: true,
  })
  username!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password!: string;
}
