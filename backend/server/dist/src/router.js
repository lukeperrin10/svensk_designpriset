"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = __importStar(require("express"));
const entries_1 = require("./routes/entries");
const profiles_1 = require("./routes/profiles");
const category_1 = require("./routes/category");
const temp_avatars_1 = __importDefault(require("./file_handlers/temp_avatars"));
const avatars_1 = __importDefault(require("./file_handlers/avatars"));
const entry_media_1 = __importDefault(require("./file_handlers/entry_media"));
const temp_entry_media_1 = __importDefault(require("./file_handlers/temp_entry_media"));
const error_1 = require("./error");
function initRouter(app) {
    console.log('init router');
    const router = express.Router();
    // router.use('/winners', winners)
    router.use('/entries', entries_1.router);
    router.use('/profiles', profiles_1.router);
    router.use('/categories', category_1.router);
    router.post('/avatar', avatars_1.default);
    router.post('/temp_avatar', temp_avatars_1.default);
    router.post('/entry_media', entry_media_1.default);
    router.post('/temp_entry_media', temp_entry_media_1.default);
    router.use((req, res) => {
        res.status(404).json(new error_1.NotFound);
    });
    router.use((err, req, res, next) => {
        if (req.app.get('env') !== 'test') {
            console.error(err);
        }
        /*
        if (req.app.get('env') !== 'development' && req.app.get('env') !== 'test') {
            delete err.stack;
        }
        */
        console.log('router middleware: ' + err);
        res.status(err.status_code || 500).json(err);
        next(err);
    });
    app.use(router);
}
exports.initRouter = initRouter;
//# sourceMappingURL=router.js.map