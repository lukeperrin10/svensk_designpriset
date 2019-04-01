export interface Model<T> {
    get?: (t: T) => Promise<Array<T>>,
    getClient?: (t: T) => Promise<Array<T>>,
    getId?: (id: number) => Promise<T>,
    create?: (t: T) => Promise<T>,
    update?: (t: T) => Promise<T>
    remove?: (id: number | T) => Promise<T>
    getName: () => string
}