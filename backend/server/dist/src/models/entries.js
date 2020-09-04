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
const helpers_1 = require("../helpers");
function getName() {
    return 'Entries';
}
exports.getName = getName;
function getId(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = 'SELECT * FROM `entries` WHERE `profile_id` = ?';
        const entries = yield db.query(query, [id]);
        return yield (addImages(entries));
    });
}
exports.getId = getId;
function addImages(entries) {
    return __awaiter(this, void 0, void 0, function* () {
        for (let i = 0; i < entries.length; i++) {
            if (!entries[i].id)
                continue;
            entries[i].entry_images = yield db.query('SELECT image FROM entry_images WHERE entry_id = ?', [entries[i].id]);
        }
        return entries;
    });
}
function create(new_entry) {
    return __awaiter(this, void 0, void 0, function* () {
        return (yield batch([new_entry], false))[0];
    });
}
exports.create = create;
function batchCreate(new_entries) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield batch(new_entries, false);
    });
}
exports.batchCreate = batchCreate;
function update(entry) {
    return __awaiter(this, void 0, void 0, function* () {
        return (yield batch([entry], true))[0];
    });
}
exports.update = update;
function batchUpdate(entries) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield batch(entries, true);
    });
}
exports.batchUpdate = batchUpdate;
function remove(id) {
    return __awaiter(this, void 0, void 0, function* () {
        yield db.query('DELETE from entry_images where entry_id = ?', [id]);
        const remove = yield db.query('DELETE FROM entries WHERE ID = ? ', [id]);
        return remove;
    });
}
exports.remove = remove;
function createImages(entry_id, images) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = images.map(i => {
            const imageIsNew = checkAvatarSource(i.image, `${temp_contants_4.AVATAR_DIR}/`);
            const image = imageIsNew ? `${temp_contants_4.AVATAR_DIR}/${i.image}` : i.image;
            return {
                image: image,
                entry_id: entry_id,
                modified: helpers_1.getDateTime(),
                created: helpers_1.getDateTime(),
                is_featured: i.is_featured || false
            };
        });
        moveAvatar(data.map(d => d.image));
        const queries = data.map(d => ({ query: 'INSERT INTO entry_images SET ?', args: d }));
        queries.unshift({ query: 'DELETE FROM entry_images WHERE entry_id = ?', args: [entry_id] });
        try {
            yield db.batchQuery(queries);
        }
        catch (e) {
            throw e;
        }
    });
}
function moveAvatar(filenames) {
    return __awaiter(this, void 0, void 0, function* () {
        for (let i = 0; i < filenames.length; i++) {
            const filename = filenames[i].split('/').pop();
            const origin = `${temp_contants_3.TEMP_AVATAR_PATH}/${filename}`;
            const dest = `${temp_contants_4.AVATAR_PATH}/${filename}`;
            if (fs_extra_1.default.existsSync(origin)) {
                yield fs_extra_1.default.move(origin, dest, (err) => {
                    if (err)
                        console.error(err);
                    console.log('Moved avatar');
                });
            }
            else {
                console.error("FILE DOES NOT EXIST");
            }
        }
    });
}
function moveSource(filenames) {
    return __awaiter(this, void 0, void 0, function* () {
        for (let i = 0; i < filenames.length; i++) {
            const filename = filenames[i].split('/').pop();
            const origin = `${temp_contants_1.TEMP_MEDIA_PATH}/${filename}`;
            const dest = `${temp_contants_2.MEDIA_PATH}/${filename}`;
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
                query: updateEntry ? 'UPDATE entries SET id = last_insert_id(?), ? WHERE ID = ?' : 'INSERT INTO entries SET ?',
                args: updateEntry ? [entry.id, entry, entry.id] : [entry]
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
        try {
            const batchInsert = yield db.batchQuery(querys);
            const profileEntries = yield db.query('SELECT * FROM `entries` WHERE `profile_id` = ?', [new_entries[0].profile_id]);
            //Handle extra images
            for (let i = 0; i < batchInsert.length; i++) {
                const entry = new_entries[i];
                if (!entry || !entry.entry_images)
                    continue;
                const id = batchInsert[i].insertId;
                const images = entry.entry_images;
                if (images && images.length > 0) {
                    yield createImages(id, images);
                }
                else {
                    console.log('images ELSE');
                    yield db.query('DELETE FROM `entry_images` WHERE `entry_id` = ?', [entry.id]);
                }
            }
            sendMails(profileEntries, update, updatedEntrieIds, new_entries[0].id);
            const ids = [...updatedEntrieIds, ...batchInsert.map(i => i.insertId)];
            return profileEntries.filter(e => ids.includes(e.id));
        }
        catch (err) {
            return err;
        }
    });
}
function checkAvatarSource(path, pattern) {
    if (path && pattern) {
        return path.indexOf(pattern) === -1;
    }
    return false;
}
function fill_entry(entry) {
    const avatarIsNew = checkAvatarSource(entry.avatar, `${temp_contants_4.AVATAR_DIR}/`);
    const sourceIsNew = checkAvatarSource(entry.source, `${temp_contants_4.SOURCE_DIR}/`);
    const avatar = avatarIsNew ? `${temp_contants_4.AVATAR_DIR}/${entry.avatar}` : entry.avatar;
    const source = entry.source && sourceIsNew ? `${temp_contants_4.SOURCE_DIR}/${entry.source}` : entry.source;
    const new_entry = {
        profile_id: entry.profile_id,
        entry_name: entry.entry_name,
        category_id: entry.category_id,
        designer: entry.designer,
        illustrator: entry.illustrator || null,
        leader: entry.leader,
        format: entry.format || null,
        size: entry.size || null,
        customer: entry.customer,
        webpage: entry.webpage || null,
        video_url: entry.video_url || null,
        source: source || null,
        secret: entry.secret,
        avatar: avatar,
        year: entry.year || `${new Date().getFullYear()}`,
        is_nominated: entry.is_nominated || 0,
        is_winner_gold: entry.is_winner_gold || 0,
        is_winner_silver: entry.is_winner_silver || 0,
        sent_nominee_notification: escapeDate(entry.sent_nominee_notification) || null,
        motivation: entry.motivation || "",
        description: entry.description || null,
        created: helpers_1.getDateTime(),
        modified: helpers_1.getDateTime()
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
function sendMails(profileEntries, update, updateIds, entry_id) {
    return __awaiter(this, void 0, void 0, function* () {
        if (Array.isArray(profileEntries)) {
            if (profileEntries[0] && profileEntries[0].profile_id) {
                const id = profileEntries[0].profile_id;
                const profile = yield db.query('SELECT * FROM `profiles` WHERE `id` = ?', [id]);
                if (Array.isArray(profile) && profile.length > 0) {
                    if ('id' in profile[0]) {
                        const entries = [];
                        profileEntries.forEach((batch) => {
                            entries.push(batch);
                        });
                        mail_handler_1.sendRegisterEmails(profile[0], entries, update, updateIds);
                    }
                }
            }
        }
        else {
            console.error('Did not send mail regarding entry: ' + entry_id);
        }
    });
}
//# sourceMappingURL=entries.js.map