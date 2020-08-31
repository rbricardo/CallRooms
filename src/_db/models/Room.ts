// tslint:disable:variable-name
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, Timestamp } from 'typeorm'
import config from '@config'

@Entity(`${config.DB.MAIN_SCHEMA}.rooms`)
export class Room extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id!: string;

  @Column('varchar')
  public name: string;

  @Column('varchar')
  public host_user: string;

  @Column('integer')
  public capacity_limit: number;

  @Column('json')
  public participants: JSON;

  @Column('timestamp with time zone')
  public created_at: Timestamp

  @Column('timestamp with time zone')
  public updated_at: Timestamp

  @Column('timestamp with time zone')
  public deleted_at: Timestamp
}


