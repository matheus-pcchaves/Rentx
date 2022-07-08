import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AlterCarColumn1657116159720 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('cars', 'License_plate');
        await queryRunner.addColumn('cars', new TableColumn({
            name: 'license_plate',
            type: 'varchar'
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('cars', new TableColumn({
            name: 'License_plate',
            type: 'varchar'
        }))

        await queryRunner.dropColumn('cars', 'license_plate');
    }    

}
