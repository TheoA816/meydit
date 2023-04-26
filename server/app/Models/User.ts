import { column, BaseModel, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Job from './Job'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public email: string

  @column()
  public phone: string

  @column()
  public accessToken: string

  @column()
  public profpic: string

  @column()
  public addr: number

  @hasMany(() => Job, {
    foreignKey: 'contact',
  })
  public user: HasMany<typeof Job>
}
