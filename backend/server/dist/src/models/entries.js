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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db = __importStar(require("../db"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const mail_handler_1 = require("../mail_handler/mail_handler");
function getName() {
    return 'Entries';
}
exports.getName = getName;
function get() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('Entries get');
        const query = yield db.query('SELECT * FROM entries');
        return query;
    });
}
exports.get = get;
function getId(id) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('Entries get');
        console.log(id);
        const query = yield db.query('SELECT * FROM `entries` WHERE `profile_id` = ?', [id]);
        return query;
    });
}
exports.getId = getId;
function create(new_entry) {
    return __awaiter(this, void 0, void 0, function* () {
        const post_entry = create_entry(new_entry);
        if (post_entry.avatar)
            yield moveAvatar([post_entry.avatar]);
        if (post_entry.source)
            yield moveSource([post_entry.source]);
        const insert = yield db.query('INSERT INTO entries SET ?', [post_entry]);
        const query = yield db.query('SELECT * FROM entries WHERE id = ?', insert.insertId);
        if (query.length > 0) {
            if ('profile_id' in query[0]) {
                const id = query[0].profile_id;
                const profile = yield db.query('SELECT * FROM `profiles` WHERE `id` = ?', [id]);
                if (profile.length > 0 && 'id' in profile[0]) {
                    mail_handler_1.sendRegisterEmails(profile[0], [query[0]], false);
                }
            }
        }
        else {
            console.error('Did not send mail regarding entry: ' + new_entry.id);
        }
        return query;
    });
}
exports.create = create;
function moveAvatar(filenames) {
    return __awaiter(this, void 0, void 0, function* () {
        for (let i = 0; i < filenames.length; i++) {
            const origin = `./upload_assets/temp_avatars/${filenames[i]}`;
            const dest = `./upload_assets/avatars/${filenames[i]}`;
            yield fs_extra_1.default.move(origin, dest, (err) => {
                if (err)
                    console.error(err);
                console.log('Moved avatar');
            });
        }
    });
}
function moveSource(filenames) {
    return __awaiter(this, void 0, void 0, function* () {
        for (let i = 0; i < filenames.length; i++) {
            const origin = `./upload_assets/temp_media/${filenames[i]}`;
            const dest = `./upload_assets/media/${filenames[i]}`;
            yield fs_extra_1.default.move(origin, dest, (err) => {
                if (err)
                    console.error(err);
                console.log('Moved avatar');
            });
        }
    });
}
function batchCreate(new_entries) {
    return __awaiter(this, void 0, void 0, function* () {
        const querys = [];
        const avatars = [];
        const sources = [];
        new_entries.forEach(new_entry => {
            const entry = create_entry(new_entry);
            querys.push({
                query: 'INSERT INTO entries SET ?',
                args: [entry]
            });
            if (entry.avatar)
                avatars.push(entry.avatar);
            if (entry.source)
                sources.push(entry.source);
        });
        yield moveAvatar(avatars);
        yield moveSource(sources);
        const batchInsert = yield db.batchQuery(querys);
        const responseQuerys = [];
        batchInsert.forEach((insert) => {
            if (insert.insertId) {
                responseQuerys.push({
                    query: 'SELECT * FROM `entries` WHERE `id` = ?',
                    args: [insert.insertId]
                });
            }
        });
        const batchSelect = yield db.batchQuery(responseQuerys);
        console.log(batchSelect[0][0]);
        if (Array.isArray(batchSelect) && Array.isArray(batchSelect[0])) {
            if (batchSelect[0][0] && batchSelect[0][0].profile_id) {
                const id = batchSelect[0][0].profile_id;
                const profile = yield db.query('SELECT * FROM `profiles` WHERE `id` = ?', [id]);
                if (Array.isArray(profile) && profile.length > 0) {
                    if ('id' in profile[0]) {
                        const entries = [];
                        batchSelect.forEach(batch => {
                            entries.push(batch[0]);
                        });
                        mail_handler_1.sendRegisterEmails(profile[0], entries, false);
                    }
                }
            }
        }
        else {
            console.error('Did not send mail regarding entry: ' + new_entries[0].id);
        }
        return batchSelect;
    });
}
exports.batchCreate = batchCreate;
function update(entry) {
    return __awaiter(this, void 0, void 0, function* () {
        const update_entry = create_entry(entry);
        try {
            const update = yield db.query('UPDATE entries SET ? WHERE ID = ?', [update_entry, entry.id]);
            return update;
        }
        catch (error) {
            return error;
        }
    });
}
exports.update = update;
function create_entry(entry) {
    const new_entry = {
        profile_id: entry.profile_id,
        entry_name: entry.entry_name,
        category: entry.category,
        designer: entry.designer,
        illustrator: entry.illustrator,
        leader: entry.leader,
        format: entry.format,
        size: entry.size,
        customer: entry.customer,
        webpage: entry.webpage,
        source: entry.source,
        secret: entry.secret,
        avatar: entry.avatar,
        year: entry.year || `${new Date().getFullYear()}`,
        is_nominated: entry.is_nominated || 0,
        is_winner_gold: entry.is_winner_gold || 0,
        is_winner_silver: entry.is_winner_silver || 0,
        sent_nominee_notification: entry.sent_nominee_notification || "1000-01-01",
        motivation: entry.motivation || "",
    };
    return new_entry;
}
//# sourceMappingURL=entries.js.map