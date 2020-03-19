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
    category_id: number,
    webpage: string,
    avatar: string,
    secret: string,
    year: string,
    entry_images: Array<string>
}

export interface IEntry {
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
    year: string,
    entry_images: Array<string>
}

export interface ICategory {
    id: number,
    name: string,
    shorttag: string
}

export enum CONTENT_TEMPLATES {
    STANDARD = 'standard',
    START_DATES = 'start_dates',
    START_INFO = 'start_info',
    REGISTER_INFO = 'register_info'
}

export interface IContent {
    title: string,
    image: string,
    content: string,
    order: number,
    template: CONTENT_TEMPLATES
}

export interface ILink {
    title: string,
    path: string
}

export interface IYearConfig {
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

export interface IPollCategories {
    [key:number]: {
        category_name: string,
        entries: IEntry[]
    }
}
export interface IPollCollection {
    id: number,
    name: string,
    stop: string,
    categories: IPollCategories
}