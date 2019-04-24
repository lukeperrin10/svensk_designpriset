"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const utf8 = __importStar(require("utf8"));
function replaceSpaces(s) {
    let result = s.replace(/\s/g, "_");
    result = utf8.decode(result);
    // result = result.replace(/[\u0800-\uFFFF]/g, '')
    // // .replace(/[\u0800-\uFFFF]/g, '')
    // result = utf8.encode(result)
    // console.log(result)
    return result;
}
exports.replaceSpaces = replaceSpaces;
//# sourceMappingURL=replacer.js.map