export interface formItems {
    [key: string]: {
        key: string,
        label: string,
        required: boolean,
        type: string,
        // controlId: string,
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
    zip: {label: "Postnummer", key: "zip", required: true, type: "text"},
    city: {label: "Ort", key: "city", required: true, type: "text"},
    phone: {label: "Telefonnummer", key: "phone", required: true, type: "text"},
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

