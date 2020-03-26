"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const temp_contants_1 = require("../constants/temp_contants");
function getSubjectRegister(profile, update) {
    return update ? `${profile.company} har uppdaterat sitt bidrag` : `Anmälan Designpriset - ${profile.company}`;
}
exports.getSubjectRegister = getSubjectRegister;
function getRegisterMailContent(update, registerLink, profile, entries, categories) {
    let title;
    let ingress;
    // WARNING!
    let year = temp_contants_1.CURRENT_YEAR;
    if (update) {
        title = "Ditt bidrag &auml;r uppdaterat";
        ingress = `Din anm&auml;lan till Svenska Designpriset ${year} &auml;r uppdaterad! Kansliet skickar ocks&aring; en bekr&auml;ftelse.`;
    }
    else {
        title = "Tack!";
        ingress = `Vi har mottagit din anm&auml;lan till Svenska Designpriset ${year}! Kansliet skickar ocks&aring; en bekr&auml;ftelse.`;
    }
    const buttonstyle = "background: url(http://www.designpriset.se/img/plus-cirkel.png) no-repeat left center; display: block; height: 46px; line-height: 46px; padding-left: 52px; margin-bottom: 40px; color:#c6a230;";
    const button = `<a id="add_more_button" style="${buttonstyle}" target="_blank" href='${registerLink}'>Lägg till fler bidrag</a>`;
    let bodyStyle = "background-color:#f5f5f3;";
    bodyStyle += " font-size: 15px;";
    bodyStyle += " line-height: 1.5em;";
    const message = ` <!DOCTYPE HTML PUBLIC '-//W3C//DTD HTML 4.01 Transitional//EN''http://www.w3.org/TR/html4/loose.dtd'> \
    <html> \
        <head> \
            <meta http-equiv='Content-Type' content='text/html; charset=utf-8'> \
        </head> \
        <body leftmargin='0' topmargin='0' marginwidth='0' marginheight='0' style='${bodyStyle}'> \
            <table style='margin:20px; width:100%;'>  \
                <tr>  \
                    <td width='100%' valign='top'>  \
                        <br>  \
                        <font style='font-family:Arial;Helvetica;font-size:40px;font-weight:bold; margin-bottom:5px; color:#c6a230; line-height:45px;'>  \
                        ${title}  \
                        </font>  \
                        <br>  \
                        <br> \
                        <font style='font-family:Arial;Helvetica;font-size:13px; color:#959595;'> \
                            ${ingress} \
                            <br> \
                            Varje bidrag kostar ${temp_contants_1.PRICE_PER_ENTRY}:- exkl. moms. Faktura med 10 dagars betalning skickas fr&aring;n Svenska Designpriset. \
                            <br> \
                            <br> \
                            ${calculatePrice(entries, false)}
                            <br> \
                            &Auml;ndringar kan g&ouml;ras fram till ${temp_contants_1.REGISTER_DEADLINE_DATE}. Klicka på länken för att ändra i bidragen eller lägga till ytterligare bidrag. \
                            <br> \
                            <a href='${registerLink}' style='color:#c6a230;font-weight:normal;'>Redigera bidrag här</a>  \
                            <br> \
                            <br> \
                            <br>  \
                            ${getProfileContent(profile)}  \
                            ${getEntryContent(entries, categories)}
                            ${button}
                            L&auml;s mer om t&auml;vlingen p&aring; <a href='http://www.designpriset.se' style='color:#c6a230;'>www.designpriset.se</a> \
                            <br> \
                        </font> \
                        <br> \
                        <br> \
                        <br> \
                    </td> \
                </tr> \
            </table> \
        </body> \
    </html> \
    `;
    return message;
}
exports.getRegisterMailContent = getRegisterMailContent;
function addButton(registerLink) {
    const buttonstyle = "background: url(http://www.designpriset.se/img/plus-cirkel.png) no-repeat left center; display: block; height: 46px; line-height: 46px; padding-left: 52px; margin-bottom: 40px; color:#c6a230;";
    const button = `<a id="add_more_button" style="${buttonstyle}" target="_blank" href='${registerLink}'>Lägg till fler bidrag</a>`;
    return button;
}
exports.addButton = addButton;
function getRegisterMailAdminContent(update, registerLink, profile, entries, categories) {
    const title = update ? `${profile.company} har uppdaterat sitt bidrag` : `Ny anmälan: ${profile.company}`;
    let content = getProfileContent(profile);
    content += calculatePrice(entries, true);
    content += "<br/>";
    content += getEntryContent(entries, categories);
    let mailContent = `<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN""http://www.w3.org/TR/html4/loose.dtd">
    <html>
        <head>
            <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
        </head>
        <body leftmargin="0" topmargin="0" marginwidth="0" marginheight="0" style="'. $this->get_body_style() .'">

            <table style="margin:20px; width:100%;">
                <tr>
                    <td width="100%" valign="top">
                        <br>

                        <font style="font-family:Arial;Helvetica;font-size:40px;font-weight:bold; color:#c6a230; line-height:45px;">
                        ${title}
                        </font>
                        <br>
                        <br>
                        <font style="font-family:Arial;Helvetica;font-size:13px; color:#959595;">
                            ${content}
                            <br>
                            Fullständig url till bidraget: <a href="${registerLink}" style="color:#c6a230;font-weight:normal;">${registerLink}</a>
                            <br>
                            <br>
                        </font>
                        <br>
                        
                        <br>
                        <br>
                        <br>
                    </td>
                </tr>
            </table>
        </body>
    </html>`;
    return mailContent;
}
exports.getRegisterMailAdminContent = getRegisterMailAdminContent;
function calculatePrice(entries, withTotal) {
    let content = `Antal bidrag: ${entries.length} st.`;
    content += "<br/>";
    content += `Pris per bidrag: ${temp_contants_1.PRICE_PER_ENTRY}:- exkl. moms.`;
    content += "<br/>";
    if (withTotal) {
        content += `Pris totalt: ${temp_contants_1.PRICE_PER_ENTRY * entries.length}:- exkl. moms.`;
        content += "</br>";
    }
    return content;
}
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
    // const targets: {[key: string]: string} = {
    //     'entry_name': 'Bidragets namn', 
    //     'category': 'Kategori', 
    //     'designer': 'Designer', 
    //     'illustrator': 'Illustratör/fotograf', 
    //     'leader': 'Projektledare', 
    //     'customer': 'Uppdragsgivare', 
    //     'webpage': 'Länk till digitala bidrag/casefilmer', 
    //     'format': 'Omfång', 
    //     'size': 'Storlek', 
    //     'source': 'Bifogad fil'
    // }
    let content = '';
    let i = 0;
    content += '<ul style="list-style:none;padding:0;">';
    entries.forEach(entry => {
        i++;
        // let cat : string = ''
        // categories.forEach(category => {
        //     if (category.shorttag === entry.category) {
        //         cat = category.name
        //     }
        // })
        const avatar = `${temp_contants_1.SITE_URL}/admin/avatars/${entry.avatar}`;
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
        content += entry.source ? `<li>Bifogad fil: <a target="_blank" href="${temp_contants_1.SITE_URL}/admin/media/${entry.source}">${entry.source}</a></li>` : '';
    });
    return content;
}
exports.getEntryContent = getEntryContent;
function getConfirmVotesContent(confirmLink) {
    const message = `Tack, vänligen bekräfta röst här: ${confirmLink}`;
    // let mailContent = `<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN""http://www.w3.org/TR/html4/loose.dtd">
    // <html>
    //     <head>
    //         <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
    //     </head>
    //     <body leftmargin="0" topmargin="0" marginwidth="0" marginheight="0" style="'. $this->get_body_style() .'">
    //       <p>${message}</p>
    //     </body>
    // </html>`
    return message;
}
exports.getConfirmVotesContent = getConfirmVotesContent;
function getNomineeMailContent(entryName) {
    return `Ditt bidrag ${entryName} har blivit nominerat!`;
}
exports.getNomineeMailContent = getNomineeMailContent;
function getNomineeMailSubject() {
    return 'Ditt bidrag har blivit nominerat';
}
exports.getNomineeMailSubject = getNomineeMailSubject;
//# sourceMappingURL=mail_content.js.map