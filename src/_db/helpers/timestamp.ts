import { CreateDateColumn, UpdateDateColumn, BaseEntity } from 'typeorm'
import { TableOptions } from 'typeorm/schema-builder/options/TableOptions'

export function withTimestamp(tableDefinitions: TableOptions): TableOptions {
  return {
    ...tableDefinitions,
    columns: [
      ...tableDefinitions.columns,
      {
        default: `now()`,
        isNullable: false,
        name: 'created_at',
        type: 'timestamp with time zone',
      },
      {
        default: `now()`,
        name: 'updated_at',
        isNullable: false,
        type: 'timestamp with time zone',
      },
      {
        default: null,
        isNullable: true,
        name: 'deleted_at',
        type: 'timestamp with time zone',
      },
    ],
  }
}

export class EntityWithTimestamp extends BaseEntity {
  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date
}
