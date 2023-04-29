import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Job from './Job'
import User from './User'

export default class Quote extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public contact: number

  @column()
  public job: number

  @column()
  public cost: number

  @column()
  public finishby: string

  @belongsTo(() => Job, {
    foreignKey: 'id',
  })
  public quoteJob: BelongsTo<typeof Job>

  @belongsTo(() => User, {
    foreignKey: 'id',
  })
  public user: BelongsTo<typeof User>
}
