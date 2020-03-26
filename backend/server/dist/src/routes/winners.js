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
const model = __importStar(require("../models/winners"));
const base_router_1 = require("./base_router");
const valid_params = ['id', 'year'];
class WinnersRouter extends base_router_1.DPRouter {
    get() {
        this.router.get('/', (req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log('DP Router get');
            console.log(req.query);
            if (req.query.year) {
                if (req.query.year.length === 4 && parseInt(req.query.year) !== NaN) {
                    res.json(yield this.model
                        .getYear(req.query.year, req.query.phase && req.query.phase));
                }
                else {
                    res.status(400).json('Year format should be YYYY (2019)');
                }
            }
            else {
                res.json(yield this.model.get(req.query));
            }
        }));
    }
}
exports.router = new WinnersRouter(model, valid_params).activate();
//# sourceMappingURL=winners.js.map