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
const model = __importStar(require("../models/entries"));
const base_router_1 = require("./base_router");
const valid_params = ['id'];
class EntriesRouter extends base_router_1.DPRouter {
    post() {
        this.router.post('/', (req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            if (Array.isArray(req.body) && req.body.length > 1) {
                res.json(yield this.model.batchCreate(req.body));
            }
            else {
                res.json(yield this.model.create(req.body[0]));
            }
        }));
    }
    delete() {
        this.router.delete('/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log('delete entry: ');
            console.log(req.params);
            if (!('id' in req.params)) {
                res.status(400).json('Delete request should contain an id');
            }
            else {
                res.json(yield this.model.remove(req.params.id));
            }
        }));
    }
    put() {
        this.router.put('/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log(req.params.id);
            console.log(req.body.id);
            if (!('id' in req.params)) {
                res.status(400).json('Put request should contain an id');
            }
            if (req.params.id != req.body[0].profile_id) {
                res.status(400).json('Id doesnt match width body');
            }
            if (Array.isArray(req.body) && req.body.length > 1) {
                res.json(yield this.model.batchUpdate(req.body));
            }
            else {
                res.json(yield this.model.update(req.body[0]));
            }
        }));
    }
}
exports.router = new EntriesRouter(model, valid_params).activate();
//# sourceMappingURL=entries.js.map