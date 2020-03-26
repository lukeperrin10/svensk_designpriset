"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const db = __importStar(require("../db"));
const phase_handler_1 = require("../phase_handler/phase_handler");
function getName() {
    return 'Winners';
}
exports.getName = getName;
function addImages(winners) {
    return __awaiter(this, void 0, void 0, function* () {
        for (let i = 0; i < winners.length; i++) {
            if (!winners[i].id)
                continue;
            winners[i].entry_images = yield db.query('SELECT image, is_featured FROM entry_images WHERE entry_id = ?', [winners[i].id]);
        }
        return winners;
    });
}
function get() {
    return __awaiter(this, void 0, void 0, function* () {
        const winners = yield db.query('SELECT * FROM winner_view WHERE is_winner_gold = 1');
        return yield addImages(winners);
    });
}
exports.get = get;
function getId(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const winners = yield db.query('SELECT * FROM `entries` WHERE `id` = ?', [id]);
        return (yield addImages(winners))[0];
    });
}
exports.getId = getId;
function getYear(year, phase) {
    return __awaiter(this, void 0, void 0, function* () {
        const currentPhase = phase_handler_1.asserArgumentIsPhase(phase) ? phase : yield phase_handler_1.getPhase();
        const todayYear = new Date().getFullYear();
        const argYear = new Date(year).getFullYear();
        const queryYear = todayYear === argYear && currentPhase !== phase_handler_1.PHASES.FIVE ? argYear - 1 : year;
        const winners = yield db.query('SELECT * FROM winner_view WHERE year = ? AND (is_winner_gold = 1 OR is_winner_silver = 1)', [queryYear]);
        return yield addImages(winners);
    });
}
exports.getYear = getYear;
//# sourceMappingURL=winners.js.map