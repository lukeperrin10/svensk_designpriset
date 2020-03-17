export interface MailVar {
    id: number,
    name: string,
    value: string
}

export enum MailType {
    ENTRY_CONFIRM = 'ENTRY_CONFIRM',
    ENTRY_CONFIRM_ADMIN = 'ENTRY_CONFIRM_ADMIN',
    ENTRY_UPDATE = 'ENTRY_UPDATE',
    ENTRY_UPDATE_ADMIN = 'ENTRY_UPDATE_ADMIN',
    NOMINEE = 'NOMINEE',
    VOTE_CONFIRM = 'VOTE_CONFIRM'
}

export interface MailContent {
    id: number,
    type: MailType,
    sender: string,
    subject: string,
    content: string
}

export interface Vote {
    created: string,
    modified: string
    secret: string,
    mail: string,
    verified: string,
    ip: string,
    entry_id: number,
    poll_id: number
}

export interface ConfirmedVote {
    secret: string
}

export interface Poll {
    id: number,
    created: string,
    modified: string,
    name: string,
    start: string,
    stop: string
}

export interface Winner {
    id: number,
    profile_id: number,
    secret: string,
    entry_name: string,
    category: string,
    source: string,
    designer: string,
    illustrator: string,
    leader: string,
    customer: string,
    created: string,
    modified: string,
    avatar: string,
    format: string,
    size: string,
    webpage: string,
    is_winner_gold: number,
    is_winner_silver: number,
    is_nominated: number,
    motivation: string,
    year: string
}
// WARNING: Should dates be string?
export interface Profile {
    id: number,
    secret: string,
    contact: string,
    company: string,
    address: string,
    zip: string,
    city: string,
    phone: string,
    mail: string,
    homepage: string,
    created: string,
    modified: string,
    invoice_paid: number
}

export interface Category {
    id: number,
    name: string,
    shorttag: string,
    active: boolean,
    created?: string,
    modified?: string
}

export interface Entry {
    id: number,
    profile_id: number,
    secret: string,
    entry_name: string,
    category_id: number,
    source: string,
    designer: string,
    illustrator: string,
    leader: string,
    customer: string,
    created?: string,
    modified: string,
    avatar: string,
    format: string,
    size: string,
    webpage: string,
    is_winner_gold: number,
    is_winner_silver: number,
    is_nominated: number,
    sent_nominee_notification: string,
    motivation: string,
    year: string
}

export interface Content {
    id: number,
    title: string,
    categories: string,
    content: string,
    image: string,
    order: number,
    template: string
}

export interface YearConfig {
    id: number,
    year: string,
    phase_1_start: string,
    phase_2_start: string,
    phase_3_start: string,
    phase_4_start: string,
    phase_5_start: string,
    register_deadline_date: string,
    nominees_can_edit_start: string,
    nominees_can_edit_end: string,
    price: string,
    award_place: string,
    award_date: string,
    winner_preview: string,
    current_phase: string
}