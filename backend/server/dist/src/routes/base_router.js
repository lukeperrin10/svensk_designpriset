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
const express = __importStar(require("express"));
// export type Methods = 'GET' | 'POST'
class DPRouter {
    constructor(model, params) {
        console.log('create DPRouter');
        this.router = express.Router();
        this.model = model;
        this.params = params;
    }
    activate() {
        console.log('DP Router activate');
        this.get();
        this.getId();
        this.put();
        this.post();
        return this.router;
    }
    get() {
        this.router.get('/', (req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log('DP Router get');
            console.log(req.query);
            res.json(yield this.model.get(req.query));
        }));
    }
    getId() {
        this.router.get('/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log('DP Router get ID');
            res.json(yield this.model.getId(req.params.id));
        }));
    }
    // WARNING: Se över denna och POST
    put() {
        this.router.put('/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
            // if (!('id' in req.args)) {
            //     throw new BadRequest('Put request should contain an id')
            // }
            res.json(yield this.model.update(req.body));
        }));
    }
    post() {
        this.router.post('/', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            console.log('DP Router get post');
            console.log(req.body);
            res.json(yield this.model.create(req.body));
        }));
    }
}
exports.DPRouter = DPRouter;
//# sourceMappingURL=base_router.js.map