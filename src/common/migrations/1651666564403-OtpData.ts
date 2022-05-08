import { MigrationInterface, QueryRunner } from "typeorm";

export class OtpData1651666564403 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // await queryRunner.query(`CREATE TABLE otp (
        //     id int,
        //     otp varchar,
        //     mobile_number varchar,
        //     expiry date,
        //     status varchar,
        //     created_at date,
        //     updated_at date,
        //     PRIMARY KEY(id)
        // )`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
