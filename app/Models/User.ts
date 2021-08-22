import { DateTime } from "luxon"
import Hash from "@ioc:Adonis/Core/Hash"
import { column, beforeSave, BaseModel } from "@ioc:Adonis/Lucid/Orm"

const dateFormart = "dd/MM/yyyy HH:mm:ss"

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public rememberMeToken?: string

  @column()
  public role: "admin" | "normal"

  @column.dateTime({
    autoCreate: true,
    serialize: (value: DateTime) => {
      return value.toFormat(dateFormart)
    }
  })
  public createdAt: DateTime

  @column.dateTime({
    autoCreate: true,
    autoUpdate: true,
    serialize: (value: DateTime) => {
      return value.toFormat(dateFormart)
    }
  })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}
