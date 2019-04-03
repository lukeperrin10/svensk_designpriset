interface formItems {
    [key: string]: {
        key: string,
        label: string,
        required: boolean,
        type: string,
        controlId: string,
    }
}

export const FORM_PROFILE_LABELS: formItems = {
    contact: {key: "contact", label: "Namn/Kontakt", required: true, type: "text", controlId: "formBasicContact"},
    company: {label: "Företag", key: "company", required: true, type: "text", controlId: "formBasicCompany"},
    address: {label: "Adress", key: "address", required: true, type: "text", controlId: "formBasicAddress"},
    zip: {label: "Postnummer", key: "zip", required: true, type: "number", controlId: "formBasicZip"},
    city: {label: "Ort", key: "city", required: true, type: "text", controlId: "formBasicCity"},
    phone: {label: "Telefonnummer", key: "phone", required: true, type: "number", controlId: "formBasicPhone"},
    mail: {label: "E-post", key: "mail", required: true, type: "email", controlId: "formBasicEmail"},
    homepage: {label: "Webbplats (ej obligatorisk)", key: "homepage", required: false, type: "text", controlId: "formBasicHomepage"},
}