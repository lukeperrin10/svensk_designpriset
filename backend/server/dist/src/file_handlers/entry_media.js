"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const folderPath = './upload_assets/media/';
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, folderPath);
    },
    filename: (req, file, cb) => {
        const originalName = file.originalname;
        const ext = originalName.toLocaleLowerCase().split('.').pop();
        const name = originalName.toLocaleLowerCase().split('.')[0];
        let fileName = originalName;
        let exists = true;
        let i = 0;
        while (exists) {
            if (fs_1.default.existsSync(`${folderPath}${fileName}`)) {
                i++;
                fileName = `${name}_${i}.${ext}`;
            }
            else {
                exists = false;
            }
        }
        cb(null, fileName);
    }
});
const multerHandler = multer_1.default({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const ext = path_1.default.extname(file.originalname);
        if (ext === '.pdf')
            cb(null, true);
        else {
            cb(new Error("NOT_PDF"), false);
        }
    },
    limits: {
        fieldSize: 4194304
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
//# sourceMappingURL=entry_media.js.map