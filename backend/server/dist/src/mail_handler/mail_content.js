"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const temp_contants_1 = require("../constants/temp_contants");
function getSubjectRegister(profile, update) {
    return update ? `${profile.company} har uppdaterat sitt bidrag` : `Anmälan Designpriset - ${profile.company}`;
}
exports.getSubjectRegister = getSubjectRegister;
function addButton(registerLink) {
    const buttonstyle = "background: url(http://www.designpriset.se/img/plus-cirkel.png) no-repeat left center; display: block; height: 46px; line-height: 46px; padding-left: 52px; margin-bottom: 40px; color:#c6a230;";
    const button = `<a id="add_more_button" style="${buttonstyle}" target="_blank" href='${registerLink}'>Lägg till fler bidrag</a>`;
    return button;
}
exports.addButton = addButton;
function getProfileContent(profile) {
    const subheading = "font-family:Arial;Helvetica;font-size:25px;font-weight:bold; margin-bottom:10px; color:#c6a230;";
    let content = `<h3 style="${subheading}">Allm&auml;nna uppgifter</h3>`;
    content += '<ul style="list-style:none;padding-left:0;">';
    content += `<li>Namn/Kontakt: ${profile.contact}</li>`;
    content += `<li>F&ouml;retag: ${profile.company}</li>`;
    content += `<li>Adress: ${profile.address}</li>`;
    content += `<li>Postadress: ${profile.zip} ${profile.city}</li>`;
    content += `<li>Telefon: ${profile.phone}</li>`;
    content += `<li>E-post: <a style="color:#c6a230;" href="mailto:${profile.mail}">${profile.mail}</a></li>`;
    content += profile.homepage ? `<li>Webbplats: <a style="color:#c6a230;" target="_blank" href="${profile.homepage}">${profile.homepage}</a></li>` : '';
    content += '</ul>';
    content += '<br>';
    return content;
}
exports.getProfileContent = getProfileContent;
function getEntryContent(entries, categories) {
    const subheading = "font-family:Arial;Helvetica;font-size:25px;font-weight:bold; margin-bottom:10px; color:#c6a230;";
    let content = '';
    let i = 0;
    content += '<ul style="list-style:none;padding:0;">';
    entries.forEach(entry => {
        i++;
        const avatar = `${temp_contants_1.STATIC_MEDIA_URL}/avatars/${entry.avatar}`;
        content += `<h3 style="${subheading}">Bidrag ${i}</h3>`;
        content += `<a target="_blank" href="${avatar}"><img height="200px;" src="${avatar}"/></a><br/><br/>`;
        content += `<li>Namn: ${entry.entry_name}</li>`;
        content += `<li>Kategori: ${entry.category_id}</li>`;
        content += `<li>Designer: ${entry.designer}</li>`;
        content += entry.illustrator ? `<li>Illustratör/fotograf: ${entry.illustrator}</li>` : '';
        content += `<li>Projektledare: ${entry.leader}</li>`;
        content += `<li>Uppdragsgivare: ${entry.customer}</li>`;
        content += entry.webpage ? `<li>Webbplats: ${entry.webpage}</li>` : '';
        content += entry.format ? `<li>Omfång: ${entry.format}</li>` : '';
        content += entry.size ? `<li>Storlek: ${entry.size}</li>` : '';
        content += entry.source ? `<li>Bifogad fil: <a target="_blank" href="${temp_contants_1.STATIC_MEDIA_URL}/sources/${entry.source}">${entry.source}</a></li>` : '';
    });
    return content;
}
exports.getEntryContent = getEntryContent;
//# sourceMappingURL=mail_content.js.map