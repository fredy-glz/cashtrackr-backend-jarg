import {
  Table,
  Column,
  DataType,
  HasMany,
  BelongsTo,
  ForeignKey,
  Model,
  AllowNull,
} from "sequelize-typescript";
import Expense from "./Expense";
import User from "./User";

@Table({
  tableName: "budgets",
})
class Budget extends Model {
  @AllowNull(false)
  @Column({
    type: DataType.STRING(100),
  })
  declare name: string;

  @AllowNull(false)
  @Column({
    type: DataType.DECIMAL,
  })
  declare amount: number;

  /**
   * onUpdate / onDelete: acciones referenciales que se aplican sobre las filas "hijas"
   * cuando la fila "padre" cambia o se elimina. Valores comunes:
   * - CASCADE: Propaga la operación a las filas hijas (ej. eliminar Budget -> elimina Expenses).
   * - RESTRICT: Evita la operación si existen filas hijas (la BD lanza error y no permite el cambio).
   * - SET NULL: Establece la FK de las filas hijas a NULL (la FK debe permitir NULL).
   * - NO ACTION: Similar a RESTRICT en muchos motores; la comprobación la realiza la BD.
   * - SET DEFAULT: Asigna el valor por defecto de la columna FK en las filas hijas.
   */
  @HasMany(() => Expense, { onUpdate: "CASCADE", onDelete: "CASCADE" })
  declare expenses: Expense[];

  @ForeignKey(() => User)
  declare userId: number;

  @BelongsTo(() => User)
  declare user: User;
}

export default Budget;
