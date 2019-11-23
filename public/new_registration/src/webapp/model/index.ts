export interface IVote {
    mail: string,
    poll_id: number,
    entry_id: number,
    ip: string,
    secret?: string
}

export interface IWinner {
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

export interface INewProfile {
    secret: string,
    contact: string,
    company: string,
    address: string,
    zip: string,
    city: string,
    phone: string,
    mail: string,
    homepage: string,
    invoice_paid: number
}

export interface IProfile {
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

export interface INewEntry {
    profile_id: number,
    entry_name: string,
    designer: string,
    illustrator: string,
    leader: string,
    customer: string,
    source: string,
    format: string,
    size: string,
    category: string,
    category_id: number,
    webpage: string,
    avatar: string,
    secret: string,
    year: string
}

export interface IEntry {
    id: number,
    profile_id: number,
    secret: string,
    entry_name: string,
    category: string,
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

export interface ICategory {
    id: number,
    name: string,
    shorttag: string
}