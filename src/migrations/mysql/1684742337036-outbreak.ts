import { randomUUID } from 'crypto';
import * as csv from 'csv-parser';
import { createReadStream } from 'fs';
import { join } from 'path';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Outbreak1684742337036 implements MigrationInterface {
  public async up(queryRunner: QueryRunner) {
    await queryRunner.createTable(
      new Table({
        name: 'outbreak',
        columns: [
          {
            name: 'outbreak_id',
            type: 'varchar',
            length: '36',
            isPrimary: true,
          },
          {
            name: 'outbreak_category_id',
            type: 'varchar',
            length: '36',
          },
          {
            name: 'sufferer',
            type: 'bigint',
          },
          {
            name: 'dead',
            type: 'bigint',
          },
          {
            name: 'district_id',
            type: 'bigint',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'deleted_at',
            type: 'timestamp',
            isNullable: true,
          },
        ],
      }),
    );
    this.csvToDb(
      join(__dirname, '../../../data/outbreak/covid.csv'),
      queryRunner,
    );
    this.csvToDb(
      join(__dirname, '../../../data/outbreak/dbd.csv'),
      queryRunner,
    );
    this.csvToDb(
      join(__dirname, '../../../data/outbreak/stunting.csv'),
      queryRunner,
    );
    this.csvToDb(join(__dirname, '../../../data/outbreak/tb.csv'), queryRunner);
  }

  public async down(queryRunner: QueryRunner) {
    await queryRunner.dropTable('outbreak');
  }

  private csvToDb(path: string, queryRunner: QueryRunner) {
    createReadStream(path)
      .pipe(csv())
      .on('data', (row: any) => {
        if (row) {
          queryRunner.query(
            `INSERT INTO outbreak (outbreak_id, outbreak_category_id, sufferer, dead, district_id, created_at) VALUES ('${randomUUID()}', '${
              row.outbreak_category_id
            }', ${row.sufferer}, ${row.dead}, ${row.district_id}, '${
              row.created_at
            }')`,
          );
        }
      });
  }
}
