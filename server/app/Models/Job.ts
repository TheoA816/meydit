import { BaseModel, HasOne, column, hasOne } from '@ioc:Adonis/Lucid/Orm'
import User from './User'

export default class Job extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public clothing: string

  @column()
  public material: string

  @column()
  public budget: number

  @column()
  public count: number

  @column()
  public descr: string

  @hasOne(() => User, {
    foreignKey: 'id',
  })
  public contact: HasOne<typeof User>

  @column()
  public addr: number
}
