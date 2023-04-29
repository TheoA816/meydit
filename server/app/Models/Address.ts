import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Address extends BaseModel {
  public static table = "addrs"

  @column({ isPrimary: true })
  public id: number

  @column()
  public city : string

  @column()
  public state : string

  @column()
  public country : string

  @column()
  public zipcode : number
}
