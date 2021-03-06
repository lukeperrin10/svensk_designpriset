export interface formItems {
    [key: string]: {
        key: string,
        label: string,
        required: boolean,
        type: string,
        selectList?: {id: number,name: string, short: string}[],
        maxLength?: number,
        small?: boolean,
        medium?: boolean,
        marginBottom?: boolean,
        singleRow?: boolean,
        categoryType?: string,
        largeTextInput?: boolean
    }
}


// export const FORM_PROFILE_LABELS: formItems = {
//     contact: {key: "contact", label: "Namn/Kontakt", required: true, type: "text", controlId: "formBasicContact"},
//     company: {label: "Företag", key: "company", required: true, type: "text", controlId: "formBasicCompany"},
//     address: {label: "Adress", key: "address", required: true, type: "text", controlId: "formBasicAddress"},
//     zip: {label: "Postnummer", key: "zip", required: true, type: "number", controlId: "formBasicZip"},
//     city: {label: "Ort", key: "city", required: true, type: "text", controlId: "formBasicCity"},
//     phone: {label: "Telefonnummer", key: "phone", required: true, type: "number", controlId: "formBasicPhone"},
//     mail: {label: "E-post", key: "mail", required: true, type: "email", controlId: "formBasicEmail"},
//     homepage: {label: "Webbplats (ej obligatorisk)", key: "homepage", required: false, type: "text", controlId: "formBasicHomepage"},
// }

export const FORM_PROFILE_LABELS: formItems = {
    company: {label: "Företag", key: "company", required: true, type: "text", maxLength:511},
    contact: {key: "contact", label: "Namn/Kontakt", required: true, type: "text", maxLength:511},
    mail: {label: "E-post", key: "mail", required: true, type: "email", maxLength:63},
    phone: {label: "Telefonnummer", key: "phone", required: true, type: "text", maxLength: 20},
    address: {label: "Adress", key: "address", required: true, type: "text", maxLength:511},
    zip: {label: "Postnummer", key: "zip", required: true, type: "text", maxLength: 9, small: true},
    city: {label: "Ort", key: "city", required: true, type: "text", medium: true, maxLength:63},
    homepage: {label: "Webbplats", key: "homepage", required: false, type: "text", maxLength:255}
}
// WARNING: Se över vilka som ska vara required eller inte
export const FORM_ENTRY_LABELS: formItems = {
    entry_name: {key: "entry_name", label: "Bidragets namn", required: true, type: "text", maxLength:127},
    customer: {key: 'customer', label: 'Uppdragsgivare', required: true, type: 'text', marginBottom: true},
    description: {key: 'description', label: 'Beskrivning (max 200 tecken)', required: true, type: 'text', marginBottom:true, largeTextInput: true, singleRow: true, maxLength: 200},
    category_id: {key: 'category_id', label: 'Tävlingskategori', required: true, type: 'select', singleRow: true},
    webpage: {key: "webpage", label: "Länk digitala bidrag/casefilmer", required: false, type: "text", singleRow: true, marginBottom: true, categoryType: 'digital', maxLength:255},
    format: {key: 'format', label: 'Omfång (Gäller trycksaker)', required: false, type: 'text', categoryType: 'print', maxLength:20},
    size: {key: 'size', label: 'Storlek (Gäller trycksaker)', required: false, type: 'text', marginBottom: true, categoryType: 'print', maxLength:20},
    video_url: {key: "video_url", label: "Länk video (endast Vimeo/Youtube)", required: false, type: "text", singleRow: true, marginBottom: true, maxLength:511},
    work_force: {key: 'work_force', label: 'Arbetsgrupp', required: false, type:'header'},
    designer: {key: 'designer', label: 'Designer', required: true, type: 'text', maxLength:511},
    illustrator: {key: 'illustrator', label: 'Illustratör/fotograf', required: false, type: 'text', maxLength:511},
    leader: {key: 'leader', label: 'Projektledare', required: true, type: 'text', maxLength:511},
    
    
}

export const TEMP_PRICE_PER_ENTRY = "3995"

export enum GENERAL_TEXT {
    thumbnail_label = "Huvudbild (rekommenderad storlek – 1000x1000px, beskärs kvadratiskt)",
    entry_images = 'Ytterligare bild (frivilligt)',
    entry_media = "Bifoga pdf-fil för printbidrag, (max filstorlek 5 Mb, undvik ÅÄÖ i filnamn)",
    after_submit = "Anmälan är klar. Du får ett mail med länk till din personliga sida där du kan ändra och lägga till fler bidrag. Kansliet skickar också en bekräftelse. Varje bidrag kostar 3995 :- exkl. moms. Faktura med 10 dagars betalning skickas från Svenska Designpriset.",
    after_update = "Updateringen av uppgifter och bidrag är klar",
    temp_price_per_entry = "3995"
}


export interface IRegInfo {
    label: string, content: string[] 
}

export const REGISTER_INFO : {[key:string]: IRegInfo}  = {
    stepOne: {
        label: 'Steg 1',
        content: [
            'Fyll i alla obligatoriska uppgifter.',
            'Bifoga en tumnagel-bild till varje bidrag.',
            'Bidrag i printkategorier kompletteras med trycksak per post i tre exemplar.',
            'Mindre material monteras på pannå.',
            'Om trycksaken inte är färdigtryckt kan du skicka med fil (PDF) och senare komplettera med trycksak.'
        ]
    },
    stepTwo: {
        label: 'Steg 2',
        content: [
            'Kontrollera dina uppgifter och dina tumnagellbilder.',
            'Du kan ändra dina uppgifter och bilder t.o.m. 14 juni.'
        ]
    },
    stepThree: {
        label: 'Steg 3',
        content: [
            'Anmälan är klar.',
            'Du får ett mail med länk till din personliga sida. Där kan du också ändra och lägga till fler bidrag.',
            'Kansliet skickar också en bekräftelse.',
            'Varje bidrag kostar 3995:- exkl. moms. Faktura med 10 dagars betalning skickas från Svenska Designpriset.'
        ]
    },
}
