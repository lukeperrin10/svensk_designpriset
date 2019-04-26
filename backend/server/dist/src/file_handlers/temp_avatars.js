"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const uniqid_1 = __importDefault(require("uniqid"));
const temp_contants_1 = require("../constants/temp_contants");
const folderPath = temp_contants_1.TEMP_AVATAR_PATH + '/';
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, folderPath);
    },
    filename: (req, file, cb) => {
        cb(null, `avatar-${uniqid_1.default('x')}.${file.originalname.toLocaleLowerCase().split('.').pop()}`);
    }
});
const multerHandler = multer_1.default({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image'))
            cb(null, true);
        else {
            cb(new Error("NOT_IMAGE"), false);
        }
    },
    limits: {
        fieldSize: 10000000
    }
});
exports.default = (req, res) => {
    multerHandler.single('media')(req, res, (error) => {
        if (error) {
            res.status(500).json({ error: error.message });
        }
        else {
            res.json(req.file.filename);
        }
    });
};
//# sourceMappingURL=temp_avatars.js.map