
export type STR_ID =   'UNKOWN_ERROR' | 'NOT_FOUND' | 'FORBIDDEN' | 'BAD_REQUEST' | 'SERVER_ERROR' | 
                'DB_ERROR' | 'DUPLICATE_KEY'

export class MFError extends Error {
    status_code: number
    str_id: STR_ID
    msg: string
    constructor(msg?: string, str_id?: STR_ID, status_code?: number) {
        super(msg || 'Unkown error')
        this.msg = msg
        this.str_id = str_id || 'UNKOWN_ERROR'
        this.status_code = status_code || 500
        console.log('new MFError: '+msg || "Unkown error")
    }
}

export class NotFound extends MFError { 
    constructor(msg?: string, str_id?: STR_ID) {
        super(msg || 'Not Found', str_id || 'NOT_FOUND', 404)
    }
}

export class Forbidden extends MFError { 
    constructor(msg?: string, str_id?: STR_ID) {
        super(msg || 'Forbidden', str_id || 'FORBIDDEN', 403)
    }
}

export class BadRequest extends MFError {
    constructor(msg?: string, str_id?: STR_ID) {
        super(msg || 'Bad Request', str_id || 'BAD_REQUEST', 400)
    }
}

export class DBError extends MFError {
    db_code: number
    constructor(msg?: string, str_id?: STR_ID, code?: number) {
        super(msg || 'Database Error', str_id || 'DB_ERROR', 500)
        this.db_code = code
    }
}