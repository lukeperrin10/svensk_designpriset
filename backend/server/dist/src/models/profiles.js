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
function getName() {
    return 'Profiles';
}
exports.getName = getName;
function get() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('Profiles get');
        // try {
        const query = yield db.query('SELECT * FROM profiles');
        return query;
        // } catch (error) {
        //     console.log('profile get error: '+error)
        // }
    });
}
exports.get = get;
function getId(id) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('Profiles get');
        console.log(id);
        const query = yield db.query('SELECT * FROM `profiles` WHERE `id` = ?', [id]);
        return query;
    });
}
exports.getId = getId;
function create(new_profile) {
    return __awaiter(this, void 0, void 0, function* () {
        const post_profile = create_profile(new_profile);
        // try {
        const insert = yield db.query('INSERT INTO profiles SET ?', [post_profile]);
        const query = yield db.query('SELECT * FROM profiles WHERE id = ?', [insert.insertId]);
        return query;
        // } catch (err) {
        // }
    });
}
exports.create = create;
function update(profile) {
    return __awaiter(this, void 0, void 0, function* () {
        const update_profile = create_profile(profile);
        const update = yield db.query('UPDATE profiles SET ? WHERE ID = ?', [update_profile, profile.id]);
        return update;
    });
}
exports.update = update;
function create_profile(profile) {
    const new_profile = {
        secret: profile.secret,
        company: profile.company,
        contact: profile.contact,
        address: profile.address,
        zip: profile.zip,
        city: profile.city,
        phone: profile.phone,
        mail: profile.mail,
        homepage: profile.homepage,
        invoice_paid: profile.invoice_paid || 0
    };
    return new_profile;
}
// contact,company,address,zip,city,phone,mail,homepage, secret
//# sourceMappingURL=profiles.js.map