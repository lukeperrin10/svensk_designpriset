export interface formItems {
    [key: string]: {
        key: string,
        label: string,
        required: boolean,
        type: string,
        selectList?: {id: number,name: string}[],
        maxLength?: number
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
    contact: {key: "contact", label: "Namn/Kontakt", required: true, type: "text"},
    company: {label: "Företag", key: "company", required: true, type: "text"},
    address: {label: "Adress", key: "address", required: true, type: "text"},
    zip: {label: "Postnummer", key: "zip", required: true, type: "text", maxLength: 9},
    city: {label: "Ort", key: "city", required: true, type: "text"},
    phone: {label: "Telefonnummer", key: "phone", required: true, type: "text", maxLength: 20},
    mail: {label: "E-post", key: "mail", required: true, type: "email"},
    homepage: {label: "Webbplats (ej obligatorisk)", key: "homepage", required: false, type: "text"}
}
// WARNING: Se över vilka som ska vara required eller inte
export const FORM_ENTRY_LABELS: formItems = {
    entry_name: {key: "entry_name", label: "Bidragets namn", required: true, type: "text"},
    webpage: {key: "webpage", label: "Länk digitala bidrag/casefilmer (ej obligatoriskt)", required: false, type: "text"},
    designer: {key: 'designer', label: 'Designer', required: true, type: 'text'},
    illustrator: {key: 'illustrator', label: 'Illustratör/fotograf (ej obligatorisk)', required: false, type: 'text'},
    leader: {key: 'leader', label: 'Projektledare', required: true, type: 'text'},
    customer: {key: 'customer', label: 'Uppdragsgivare', required: true, type: 'text'},
    format: {key: 'format', label: 'Omfång (Gäller trycksaker)', required: false, type: 'text'},
    size: {key: 'size', label: 'Storlek (Gäller trycksaker)', required: false, type: 'text'},
    category: {key: 'category', label: 'Tävlingskategori', required: true, type: 'select'}
}


export enum GENERAL_TEXT {
    thumbnail_label = "Bild för tumnagel (rekommenderad storlek – 550px bred/735px hög)",
    entry_media = "Bifoga pdf-fil för printbidrag, (ej obligatorisk, max filstorlek 5 Mb, undvik ÅÄÖ i filnamn)",
    after_submit = "Anmälan är klar. Du får ett mail med länk till din personliga sida där du kan ändra och lägga till fler bidrag. Kansliet skickar också en bekräftelse. Varje bidrag kostar FIXA PRIS :- exkl. moms. Faktura med 10 dagars betalning skickas från Svenska Designpriset.",
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
            'Bifoga gärna en bild (tumnagel) till varje bidrag.',
            'Bidrag i printkategorier kompletteras med trycksak per post i tre exemplar.',
            'Mindre material monteras på pannå.',
            'Om trycksaken inte är färdigtryckt kan du skicka med fil (PDF) och senare komplettera med trycksak.'
        ]
    },
    stepTwo: {
        label: 'Steg 2',
        content: [
            'Kontrollera dina uppgifter och dina bilder (tumnaglar).',
            'Du kan ändra dina uppgifter och bilder t.o.m. 15 juni.'
        ]
    },
    stepThree: {
        label: 'Steg 2',
        content: [
            'Anmälan är klar.',
            'Du får ett mail med länk till din personliga sida. Där kan du också ändra och lägga till fler bidrag.',
            'Kansliet skickar också en bekräftelse.',
            'Varje bidrag kostar 3995:- exkl. moms. Faktura med 10 dagars betalning skickas från Svenska Designpriset.'
        ]
    },
}
