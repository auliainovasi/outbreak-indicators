import * as csv from 'csv-parser';
import { createReadStream } from 'fs';
import { join } from 'path';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class District1684742345501 implements MigrationInterface {
  public async up(queryRunner: QueryRunner) {
    await queryRunner.createTable(
      new Table({
        name: 'district',
        columns: [
          {
            name: 'district_id',
            type: 'bigint',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'city_id',
            type: 'bigint',
          },
          {
            name: 'district_name',
            type: 'varchar',
            length: '255',
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
    await queryRunner.query(
      'CREATE INDEX district_idx ON district (district_name, city_id)',
    );
    this.csvToDb(join(__dirname, '../../data/district.csv'), queryRunner);
  }

  public async down(queryRunner: QueryRunner) {
    await queryRunner.dropTable('district');
  }

  private csvToDb(path: string, queryRunner: QueryRunner) {
    createReadStream(path)
      .pipe(csv())
      .on('data', (row: any) => {
        if (row) {
          queryRunner.query(
            `INSERT INTO district (district_id, city_id, district_name) VALUES (${row.district_id}, ${row.city_id}, '${row.district_name}')`,
          );
        }
      });
  }
}
