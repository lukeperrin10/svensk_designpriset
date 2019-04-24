"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MFError extends Error {
    constructor(msg, str_id, status_code) {
        super(msg || 'Unkown error');
        console.log('new error');
        this.msg = msg;
        this.str_id = str_id || 'UNKOWN_ERROR';
        this.status_code = status_code || 500;
    }
}
exports.MFError = MFError;
class NotFound extends MFError {
    constructor(msg, str_id) {
        super(msg || 'Not Found', str_id || 'NOT_FOUND', 404);
    }
}
exports.NotFound = NotFound;
class Forbidden extends MFError {
    constructor(msg, str_id) {
        super(msg || 'Forbidden', str_id || 'FORBIDDEN', 403);
    }
}
exports.Forbidden = Forbidden;
class BadRequest extends MFError {
    constructor(msg, str_id) {
        super(msg || 'Bad Request', str_id || 'BAD_REQUEST', 400);
    }
}
exports.BadRequest = BadRequest;
class DBError extends MFError {
    constructor(msg, str_id, code) {
        super(msg || 'Database Error', str_id || 'DB_ERROR', 500);
        this.db_code = code;
    }
}
exports.DBError = DBError;
//# sourceMappingURL=error.js.map