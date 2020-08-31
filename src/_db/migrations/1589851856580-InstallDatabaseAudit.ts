import { MigrationInterface, QueryRunner } from 'typeorm'
import { auditSQL } from '@db/helpers/audit'

export class InstallDatabaseAudit1589851856580 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(auditSQL)
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  public async down(queryRunner: QueryRunner): Promise<void> {}
}
