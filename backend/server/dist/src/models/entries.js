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
const temp_contants_1 = require("../constants/temp_contants");
const temp_contants_2 = require("../constants/temp_contants");
const temp_contants_3 = require("../constants/temp_contants");
const temp_contants_4 = require("../constants/temp_contants");
function getName() {
    return 'Entries';
}
exports.getName = getName;
function get() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('ENTRIES GET');
        const query = yield db.query('SELECT * FROM entries');
        if (query)
            console.log('ENTRIES GET query response recieved');
        return query;
    });
}
exports.get = get;
function getId(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = yield db.query('SELECT * FROM `entries` WHERE `profile_id` = ?', [id]);
        return query;
    });
}
exports.getId = getId;
function create(new_entry) {
    return __awaiter(this, void 0, void 0, function* () {
        const updateEntry = 'id' in new_entry;
        const updatedIds = [];
        console.log('update entry? ' + updateEntry);
        console.log(new_entry);
        const post_entry = fill_entry(new_entry);
        if (post_entry.avatar)
            yield moveAvatar([post_entry.avatar]);
        if (post_entry.source)
            yield moveSource([post_entry.source]);
        const queryString = updateEntry ? 'UPDATE entries SET ? WHERE ID = ?' : 'INSERT INTO entries SET ?';
        const args = updateEntry ? [post_entry, new_entry.id] : [post_entry];
        const insert = yield db.query(queryString, args);
        const id = updateEntry ? new_entry.id : insert.insertId;
        const query = updateEntry ? yield db.query('SELECT * FROM entries WHERE profile_id = ?', [new_entry.profile_id]) : yield db.query('SELECT * FROM entries WHERE id = ?', id);
        if (query.length > 0) {
            if ('profile_id' in query[0]) {
                if (updateEntry) {
                    query.forEach((q) => {
                        if ('id' in q)
                            updatedIds.push(q.id);
                    });
                }
                const id = query[0].profile_id;
                const profile = yield db.query('SELECT * FROM `profiles` WHERE `id` = ?', [id]);
                if (profile.length > 0 && 'id' in profile[0]) {
                    mail_handler_1.sendRegisterEmails(profile[0], updateEntry ? query : [query[0]], updateEntry, updatedIds);
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
            const origin = `${temp_contants_3.TEMP_AVATAR_PATH}/${filenames[i]}`;
            const dest = `${temp_contants_4.AVATAR_PATH}/${filenames[i]}`;
            if (fs_extra_1.default.existsSync(origin)) {
                yield fs_extra_1.default.move(origin, dest, (err) => {
                    if (err)
                        console.error(err);
                    console.log('Moved avatar');
                });
            }
        }
    });
}
function moveSource(filenames) {
    return __awaiter(this, void 0, void 0, function* () {
        for (let i = 0; i < filenames.length; i++) {
            const origin = `${temp_contants_1.TEMP_MEDIA_PATH}/${filenames[i]}`;
            const dest = `${temp_contants_2.MEDIA_PATH}/${filenames[i]}`;
            if (fs_extra_1.default.existsSync(origin)) {
                yield fs_extra_1.default.move(origin, dest, (err) => {
                    if (err)
                        console.error(err);
                    console.log('Moved avatar');
                });
            }
        }
    });
}
function batch(new_entries, update) {
    return __awaiter(this, void 0, void 0, function* () {
        const querys = [];
        const avatars = [];
        const sources = [];
        const updatedEntrieIds = [];
        new_entries.forEach(new_entry => {
            const updateEntry = 'id' in new_entry;
            const entry = fill_entry(new_entry);
            querys.push({
                query: updateEntry ? 'UPDATE entries SET ? WHERE ID = ?' : 'INSERT INTO entries SET ?',
                args: updateEntry ? [entry, entry.id] : [entry]
            });
            if (entry.avatar)
                avatars.push(entry.avatar);
            if (entry.source)
                sources.push(entry.source);
            if (updateEntry)
                updatedEntrieIds.push(entry.id);
        });
        yield moveAvatar(avatars);
        yield moveSource(sources);
        const batchInsert = yield db.batchQuery(querys);
        console.log('batch insert log: ');
        console.log(batchInsert);
        const responseQuerys = [];
        // if (update) {
        console.log('UPDATE!');
        responseQuerys.push({ query: 'SELECT * FROM `entries` WHERE `profile_id` = ?', args: [new_entries[0].profile_id] });
        // } else {
        //     batchInsert.forEach((insert: any) => {
        //         if (insert.insertId) {
        //             responseQuerys.push({
        //                 query: 'SELECT * FROM `entries` WHERE `id` = ?',
        //                 args: [insert.insertId]
        //             })
        //         }
        //     })
        // }
        const batchSelect = yield db.batchQuery(responseQuerys);
        if (Array.isArray(batchSelect) && Array.isArray(batchSelect[0])) {
            if (batchSelect[0][0] && batchSelect[0][0].profile_id) {
                const id = batchSelect[0][0].profile_id;
                const profile = yield db.query('SELECT * FROM `profiles` WHERE `id` = ?', [id]);
                if (Array.isArray(profile) && profile.length > 0) {
                    if ('id' in profile[0]) {
                        const entries = [];
                        batchSelect[0].forEach((batch) => {
                            entries.push(batch);
                        });
                        mail_handler_1.sendRegisterEmails(profile[0], entries, update, updatedEntrieIds);
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
function batchCreate(new_entries) {
    return __awaiter(this, void 0, void 0, function* () {
        return batch(new_entries, false);
    });
}
exports.batchCreate = batchCreate;
function remove(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const remove = yield db.query('DELETE FROM entries WHERE ID = ? ', [id]);
        return remove;
    });
}
exports.remove = remove;
function update(entry) {
    return __awaiter(this, void 0, void 0, function* () {
        const update_entry = fill_entry(entry);
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
function batchUpdate(entries) {
    return __awaiter(this, void 0, void 0, function* () {
        return batch(entries, true);
    });
}
exports.batchUpdate = batchUpdate;
function fill_entry(entry) {
    const new_entry = {
        profile_id: entry.profile_id,
        entry_name: entry.entry_name,
        category: entry.category,
        designer: entry.designer,
        illustrator: entry.illustrator || '',
        leader: entry.leader,
        format: entry.format || '',
        size: entry.size || '',
        customer: entry.customer,
        webpage: entry.webpage || '',
        source: entry.source || '',
        secret: entry.secret,
        avatar: entry.avatar,
        year: entry.year || `${new Date().getFullYear()}`,
        is_nominated: entry.is_nominated || 0,
        is_winner_gold: entry.is_winner_gold || 0,
        is_winner_silver: entry.is_winner_silver || 0,
        sent_nominee_notification: escapeDate(entry.sent_nominee_notification) || "1000-01-01",
        motivation: entry.motivation || "",
    };
    if ('id' in entry)
        new_entry.id = entry.id;
    return new_entry;
}
// WARNING: Find better solution for formating dates
function escapeDate(date) {
    if (date) {
        return date.replace("T", " ").replace("Z", " ");
    }
    else {
        return undefined;
    }
}
//# sourceMappingURL=entries.js.map