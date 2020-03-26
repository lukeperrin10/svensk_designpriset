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
const mail_content_1 = require("./mail_content");
const dbtypes_1 = require("../types/dbtypes");
const category_1 = require("../models/category");
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
                host: "smtp02.ports.local",
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
        // await mail(email, 'Bekräfta röst', getConfirmVotesContent(generateConfirmVotesLink(secret)))
    });
}
exports.sendConfirmVotesMail = sendConfirmVotesMail;
// WARNING CHANGE EMAIL ADRESS!
function sendRegisterEmails(profile, entries, update, updatedIds) {
    return __awaiter(this, void 0, void 0, function* () {
        const categories = yield category_1.get();
        yield mail(profile.mail, mail_content_1.getSubjectRegister(profile, update), 'text', mail_content_1.getRegisterMailContent(false, generateUserLink(profile.id, profile.secret), profile, entries, categories)).catch(err => console.log(err));
        const includedEntries = exludeEntries(updatedIds, entries);
        if (includedEntries.length > 0) {
            console.log('will send admin mail');
            yield mail(temp_contants_1.ADMIN_EMAIL, mail_content_1.getSubjectRegister(profile, update), 'text', mail_content_1.getRegisterMailAdminContent(false, generateAdminLink(profile.id, profile.secret), profile, entries, categories)).catch(err => console.log(err));
        }
    });
}
exports.sendRegisterEmails = sendRegisterEmails;
function exludeEntries(ids, entries) {
    const includedEntries = [];
    entries.forEach(entry => {
        if (!(ids.indexOf(entry.id) > -1)) {
            includedEntries.push(entry);
        }
    });
    return includedEntries;
}
function sendNomineeMailBatch(ids) {
    return __awaiter(this, void 0, void 0, function* () {
        for (let i = 0; i < ids.length; i++) {
            yield sendNomineeMail(ids[i]);
        }
    });
}
exports.sendNomineeMailBatch = sendNomineeMailBatch;
function sendNomineeMail(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = `SELECT entry_name, p.mail FROM entries e 
    JOIN profiles p on e.profile_id = p.id
    WHERE e.id = ?`;
        try {
            const entry = yield db.query(query, [id]);
            if (entry[0] && entry[0].mail && entry[0].entry_name) {
                yield mail(entry[0].mail, mail_content_1.getNomineeMailSubject(), mail_content_1.getNomineeMailContent(entry[0].entry_name));
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