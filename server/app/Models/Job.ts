import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
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
  public images: string[]

  @column()
  public count: number

  @column()
  public descr: string

  @column()
  public contact: number

  @column()
  public addr: number

  @belongsTo(() => User, {
    foreignKey: 'contact',
  })
  public user: BelongsTo<typeof User>
}
