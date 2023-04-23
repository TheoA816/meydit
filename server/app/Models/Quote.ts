import { BaseModel, HasOne, column, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Job from './Job'

export default class Quote extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @hasOne(() => Job, {
    foreignKey: 'id',
  })
  public contact: HasOne<typeof Job>

  @column()
  public cost: number

  @column()
  public timeframe: string
}
