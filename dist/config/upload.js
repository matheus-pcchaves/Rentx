"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _crypto = _interopRequireDefault(require("crypto"));

var _multer = _interopRequireDefault(require("multer"));

var _path = require("path");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const tmpfolder = (0, _path.resolve)(__dirname, "..", "..", "tmp");
var _default = {
  tmpfolder,
  storage: _multer.default.diskStorage({
    destination: tmpfolder,
    filename: (request, file, callback) => {
      const fileHash = _crypto.default.randomBytes(16).toString("hex");

      const fileName = `${fileHash}-${file.originalname}`;
      return callback(null, fileName);
    }
  })
};
exports.default = _default;