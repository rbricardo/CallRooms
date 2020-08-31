import { MigrationInterface, QueryRunner } from 'typeorm'

export class SetDatabaseTimezoneToUTC1589848152965 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`set timezone = 'utc';`)
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  public async down(queryRunner: QueryRunner): Promise<void> {}
}
