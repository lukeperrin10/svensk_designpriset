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
const nodeMailer = __importStar(require("nodemailer"));
const temp_contants_1 = require("../constants/temp_contants");
const dbtypes_1 = require("../types/dbtypes");
const db = __importStar(require("../db"));
const mail_content_handler_1 = require("./mail_content_handler");
// WARNING : Change user and pass!
function mail(to, subject, message, html) {
    return __awaiter(this, void 0, void 0, function* () {
        let transporter;
        if (process.env.NODE_ENV === 'development') {
            transporter = nodeMailer.createTransport({
                host: 'smtp.ethereal.email',
                port: 587,
                auth: {
                    user: 'viola.morissette88@ethereal.email',
                    pass: 'sxUZKrPQQmjfxYRddD'
                }
            });
        }
        else {
            transporter = nodeMailer.createTransport({
                // host: "smtp02.ports.local",
                host: 'mail03.portsit.se',
                port: 25
            });
        }
        const content = {
            from: '"Svenska Designpriset" <info@designpriset.se>',
            to: to,
            subject: subject,
            text: message,
            html: html || ''
        };
        yield transporter.sendMail(content, (err, res) => {
            if (err) {
                console.log("Error type: ", err.name);
                console.log("SMTP log: ", err.message);
            }
            else {
                console.log('Did send mail!');
            }
        });
    });
}
exports.mail = mail;
function generateUserLink(id, secret) {
    console.log(`gen user:  id: ${id}, secret: ${secret}`);
    return `${temp_contants_1.REGISTER_ROOT_URL}/edit?id=${id}&secret=${secret}`;
}
exports.generateUserLink = generateUserLink;
function generateAdminLink(id, secret) {
    console.log(`gen admin:  id: ${id}, secret: ${secret}`);
    return `${temp_contants_1.REGISTER_ROOT_URL}/edit?id=${id}&secret=${secret}&adm=true`;
}
exports.generateAdminLink = generateAdminLink;
function generateConfirmVotesLink(secret) {
    return `${temp_contants_1.REGISTER_ROOT_URL}/rostning?confirm=${secret}`;
}
exports.generateConfirmVotesLink = generateConfirmVotesLink;
function sendConfirmVotesMail(email, secret) {
    return __awaiter(this, void 0, void 0, function* () {
        const mailContent = yield mail_content_handler_1.getMailContent(dbtypes_1.MailType.VOTE_CONFIRM, secret = secret);
        yield mail(email, mailContent.subject, '', mailContent.content);
    });
}
exports.sendConfirmVotesMail = sendConfirmVotesMail;
function sendRegisterEmails(profile, entries, update, updatedIds) {
    return __awaiter(this, void 0, void 0, function* () {
        if (updatedIds.length === 0) {
            const mailContent = yield mail_content_handler_1.getMailContent(dbtypes_1.MailType.ENTRY_CONFIRM, undefined, profile, entries);
            yield mail(profile.mail, mailContent.subject, mailContent.content, mailContent.content);
            const adminMailContent = yield mail_content_handler_1.getMailContent(dbtypes_1.MailType.ENTRY_CONFIRM_ADMIN, undefined, profile, entries);
            yield mail(temp_contants_1.ADMIN_EMAIL, adminMailContent.subject, adminMailContent.content, adminMailContent.content);
        }
        else {
            const includedEntries = exludeEntries(updatedIds, entries);
            const mailContent = yield mail_content_handler_1.getMailContent(dbtypes_1.MailType.ENTRY_UPDATE, undefined, profile, includedEntries);
            yield mail(profile.mail, mailContent.subject, mailContent.content, mailContent.content);
            const adminMailContent = yield mail_content_handler_1.getMailContent(dbtypes_1.MailType.ENTRY_UPDATE_ADMIN, undefined, profile, includedEntries);
            yield mail(temp_contants_1.ADMIN_EMAIL, adminMailContent.subject, adminMailContent.content, adminMailContent.content);
        }
    });
}
exports.sendRegisterEmails = sendRegisterEmails;
function exludeEntries(ids, entries) {
    const includedEntries = [];
    entries.forEach(entry => {
        if (ids.indexOf(entry.id) !== -1) {
            includedEntries.push(entry);
        }
    });
    return includedEntries;
}
function sendNomineeMailBatch(ids) {
    return __awaiter(this, void 0, void 0, function* () {
        if (Array.isArray(ids)) {
            for (let i = 0; i < ids.length; i++) {
                yield sendNomineeMail(ids[i]);
            }
        }
        else {
            yield sendNomineeMail(ids);
        }
    });
}
exports.sendNomineeMailBatch = sendNomineeMailBatch;
function sendNomineeMail(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = `SELECT * FROM entries WHERE id = ?`;
        const profileQuery = `SELECT * FROM profiles WHERE id = ?`;
        try {
            const entry = yield db.query(query, [id]);
            if (entry[0] && entry[0].entry_name) {
                const profile = yield db.query(profileQuery, entry[0].profile_id);
                const mailContent = yield mail_content_handler_1.getMailContent(dbtypes_1.MailType.NOMINEE, undefined, profile[0], entry);
                yield mail(profile[0].mail, mailContent.subject, mailContent.content, mailContent.content);
            }
            else {
                console.log('faulty values before sending nominee email');
            }
            return true;
        }
        catch (error) {
            console.log(error);
            return false;
        }
    });
}
//# sourceMappingURL=mail_handler.js.map