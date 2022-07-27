"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AlterCarColumn1657116159720 = void 0;

var _typeorm = require("typeorm");

class AlterCarColumn1657116159720 {
  async up(queryRunner) {
    await queryRunner.dropColumn('cars', 'License_plate');
    await queryRunner.addColumn('cars', new _typeorm.TableColumn({
      name: 'license_plate',
      type: 'varchar'
    }));
  }

  async down(queryRunner) {
    await queryRunner.addColumn('cars', new _typeorm.TableColumn({
      name: 'License_plate',
      type: 'varchar'
    }));
    await queryRunner.dropColumn('cars', 'license_plate');
  }

}

exports.AlterCarColumn1657116159720 = AlterCarColumn1657116159720;