"use strict";
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
const valid_params = ['id'];
exports.router = new base_router_1.DPRouter(model, valid_params).activate();
//# sourceMappingURL=winners.js.map