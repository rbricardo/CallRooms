import { MigrationInterface, QueryRunner, Table } from 'typeorm'
import config from '@config'
import { withTimestamp } from '@db/helpers/timestamp'

const tableName = `${config.DB.MAIN_SCHEMA}.users`

export class CreateUsersTable1589853049499 implements MigrationInterface {
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
              isNullable: false,
              name: 'username',
              type: 'varchar',
              isUnique: true,
            },
            {
              isNullable: false,
              name: 'password',
              type: 'varchar',
            },
            {
              isNullable: true,
              name: 'mobile_token',
              type: 'varchar',
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
