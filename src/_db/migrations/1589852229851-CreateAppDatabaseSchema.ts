import { MigrationInterface, QueryRunner } from 'typeorm'
import config from '@config'

const appSchema = config.DB.MAIN_SCHEMA
const auditSchema = config.DB.AUDIT_SCHEMA

export class CreateDatabaseSchema1589852229851 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      create schema if not exists ${appSchema};
      revoke all on schema ${appSchema} from public;
      set search_path TO ${appSchema}, ${appSchema}_audit, public;
      grant all privileges on schema ${appSchema} to ${config.DB.USER};
      grant all privileges on schema ${auditSchema} to ${config.DB.USER};
    `)
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  public async down(queryRunner: QueryRunner): Promise<void> {}
}
