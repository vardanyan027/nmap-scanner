// import { MigrationInterface, QueryRunner, Table } from "typeorm";
//
// export class Scans1631880353953 implements MigrationInterface {
//
//     public async up(queryRunner: QueryRunner): Promise<void> {
//         await queryRunner.createTable(
//             new Table({
//                 name: 'scans',
//                 columns: [
//                     {
//                         name: 'id',
//                         type: 'int4',
//                         isPrimary: true,
//                         isGenerated: true,
//                         generationStrategy: 'increment',
//                     },
//                     {
//                         name: 'hostname',
//                         type: 'varchar',
//                         isNullable: false,
//                     },
//                     {
//                         name: 'ip',
//                         type: 'varchar',
//                         isNullable: false,
//                     },
//                     {
//                         name: 'openPorts',
//                         type: 'string'
//                     },
//                     {
//                         name: 'osNmap',
//                         type: 'string'
//                     },
//                     {
//                         name: 'vendor',
//                         type: 'string',
//                         isNullable: true
//                     },
//                     {
//                         name: 'started_at',
//                         type: 'datetime'
//                     },
//                     {
//                         name: 'status',
//                         type: 'int4'
//                     }
//                 ],
//             }),
//             false,)
//     }
//
//     public async down(queryRunner: QueryRunner): Promise<void> {
//     }
//
// }
