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
                port: 587,
                secure: false
            });
        }
        const content = {
            from: '"Designpriset (no-reply)" <no-reply@designpriset.se>',
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
// WARNING CHANGE EMAIL ADRESS!
function sendRegisterEmails(profile, entries, update) {
    return __awaiter(this, void 0, void 0, function* () {
        yield mail(profile.mail, mail_content_1.getSubjectRegister(profile, update), 'text', mail_content_1.getRegisterMailContent(false, generateUserLink(profile.id, profile.secret), profile, entries)).catch(err => console.log(err));
        yield mail(temp_contants_1.ADMIN_EMAIL, mail_content_1.getSubjectRegister(profile, update), 'text', mail_content_1.getRegisterMailAdminContent(false, generateAdminLink(profile.id, profile.secret), profile, entries)).catch(err => console.log(err));
    });
}
exports.sendRegisterEmails = sendRegisterEmails;
//# sourceMappingURL=mail_handler.js.map