// tslint:disable:variable-name
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, Timestamp } from 'typeorm'
import config from '@config'

@Entity(`${config.DB.MAIN_SCHEMA}.users`)
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id!: string;

  @Column({
    type: "varchar",
    unique: true
  })
  public username: string;

  @Column('varchar')
  public password: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  public mobile_token: string;

  @Column('timestamp with time zone')
  public created_at: Timestamp

  @Column('timestamp with time zone')
  public updated_at: Timestamp

  @Column('timestamp with time zone')
  public deleted_at: Timestamp
}


