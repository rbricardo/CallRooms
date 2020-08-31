import { MigrationInterface, QueryRunner, Table } from 'typeorm'
import config from '@config'
import { withTimestamp } from '@db/helpers/timestamp'

const tableName = `${config.DB.MAIN_SCHEMA}.rooms`

export class CreateRoomsTable1598809318129 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table(
        withTimestamp({
          columns: [
            {
              generationStrategy: 'uuid',
              isGenerated: true,
              isPrimary: true,
              name: 'id',
              type: 'uuid',
            },
            {
              default: `'RoomTest'`,
              isNullable: false,
              name: 'name',
              type: 'varchar',
            },
            {
              isNullable: false,
              name: 'host_user',
              type: 'varchar',
            },
            {
              default: 5,
              isNullable: false,
              name: 'capacity_limit',
              type: 'integer',
            },
            {
              default: `'{}'`,
              name: 'participants',
              type: 'json',
            },
          ],
          name: tableName,
        }),
      ),
    )
    await queryRunner.query(`select ${config.DB.AUDIT_SCHEMA}.audit_table('${tableName}');`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(`${config.DB.MAIN_SCHEMA}.${tableName}`)
  }
}
