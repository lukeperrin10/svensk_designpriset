"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const uniqid_1 = __importDefault(require("uniqid"));
const temp_contants_1 = require("../constants/temp_contants");
const gm_1 = __importDefault(require("gm"));
let imageMagick = gm_1.default.subClass({ imageMagick: true });
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
            const filePath = `${folderPath}${req.file.filename}`;
            cropImage(filePath, () => {
                res.json(req.file.filename);
            });
        }
    });
};
function cropImage(filename, callBack) {
    const endWidth = 770;
    const endHeight = 1030;
    let newWidth = 0;
    let newHeigth = 0;
    imageMagick(filename).size((err, val) => {
        if (err)
            console.error(err);
        newWidth = val.width;
        newHeigth = val.height;
        const ratio = 1030 / newHeigth;
        newHeigth = newHeigth * ratio;
        newWidth = newWidth * ratio;
        const x = newWidth - endWidth / 2;
        imageMagick(filename)
            .gravity('Center')
            .resize(newWidth, newHeigth)
            .crop(endWidth, endHeight, 0, 0)
            .write(filename, err => {
            if (err)
                console.error(err);
            callBack();
        });
    });
}
//# sourceMappingURL=temp_avatars.js.map