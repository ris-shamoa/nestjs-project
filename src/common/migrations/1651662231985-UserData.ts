import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class UserData1651662231985 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // await queryRunner.query(`CREATE TABLE users (
        //     id int,
        //     name varchar,
        //     email varchar,
        //     mobile_number varchar,
        //     is_active boolean,
        //     status varchar,
        //     created_at date,
        //     updated_at date,
        //     PRIMARY KEY(id)
        // )`);

        // await queryRunner.createTable(new Table({
        //     name: "users",
        //     columns: [
        //         {
        //             name: 'id',
        //             type: 'integer',
        //             isPrimary: true,
        //             isGenerated: true, // Auto-increment
        //             generationStrategy: 'increment',
        //         },
        //         {
        //             name: 'email',
        //             type: 'varchar',
        //             length: '255',
        //             isUnique: true,
        //             isNullable: false,
        //         },
        //         {
        //             name: 'created_at',
        //             type: 'timestamptz',
        //             isNullable: false,
        //             default: 'now()',
        //         },
        //         {
        //             name: 'updated_at',
        //             type: 'timestamptz',
        //             isNullable: false,
        //             default: 'now()',
        //         },
        //     ], indices: [
        //         {
        //             columnNames: ["authorId", "authorUserId"],
        //             isUnique: true,
        //         },
        //     ], foreignKeys: [
        //         {
        //             name: "Skills",
        //             referencedTableName: "skills",
        //             referencedColumnNames: ["id"],
        //             columnNames: ["skills_id"],
        //             onDelete: "CASCADE",
        //             onUpdate: "CASCADE",
        //         },
        //     ],
        // }), true)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
