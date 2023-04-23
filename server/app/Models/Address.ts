import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Address extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public city : string

  @column()
  public state : string

  @column()
  public country : string

  @column()
  public zip : number
}
