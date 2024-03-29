import * as csv from 'csv-parser';
import { createReadStream } from 'fs';
import { join } from 'path';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Location1685334377534 implements MigrationInterface {
  public async up(queryRunner: QueryRunner) {
    await queryRunner.createTable(
      new Table({
        name: 'location',
        columns: [
          {
            name: 'location_id',
            type: 'uuid',
            isPrimary: true,
            default: 'uuid_generate_v4()',
          },
          {
            name: 'district_id',
            type: 'bigint',
          },
          {
            name: 'latitude',
            type: 'double precision',
          },
          {
            name: 'longitude',
            type: 'double precision',
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
    this.csvToDb(join(__dirname, '../../../data/location.csv'), queryRunner);
  }

  public async down(queryRunner: QueryRunner) {
    await queryRunner.dropTable('location');
  }

  private csvToDb(path: string, queryRunner: QueryRunner) {
    createReadStream(path)
      .pipe(csv())
      .on('data', (row: any) => {
        if (row) {
          queryRunner.query(
            `INSERT INTO location (district_id, latitude, longitude) VALUES (${row.district_id}, ${row.latitude}, ${row.longitude})`,
          );
        }
      });
  }
}
