"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const mysql = require('mysql')
const mysql_1 = __importDefault(require("mysql"));
const async_1 = __importDefault(require("async"));
const error_1 = require("./error");
function handleDbError(err, map) {
    if (!map)
        map = [];
    function getFromMap(key) {
        for (let i = 0; i < map.length; i++) {
            for (let o in map[i]) {
                if (o == key)
                    return map[i][o];
            }
        }
        return key;
    }
    const code = parseInt(err.code);
    const new_err = new error_1.DBError(err.message, 'DB_ERROR', code);
    switch (code) {
        case 23505:
            new_err.str_id = getFromMap('DUPLICATE_KEY');
            new_err.status_code = 400;
    }
    throw new_err;
}
exports.handleDbError = handleDbError;
exports.pool = mysql_1.default.createPool({
    connectionLimit: 9,
    host: process.env.DP_BACKEND_MYSQL_HOST,
    user: process.env.DP_BACKEND_MYSQL_USER,
    password: process.env.DP_BACKEND_MYSQL_PASSWORD,
    database: process.env.DP_BACKEND_MYSQL_DATABASE,
});
function query(query, args) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('DB QUERY: ' + query);
        return new Promise((resolve, reject) => {
            exports.pool.query(query, args, (error, results, fields) => {
                if (error) {
                    console.error(error);
                    reject(error);
                }
                else {
                    console.log('DB QUERY SUCCESS');
                    resolve(results);
                }
            });
        }).catch((error) => {
            console.error('error single query: ' + error);
        });
    });
}
exports.query = query;
function batchQuery(queries) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('DB BATCH QUERY: ');
        let i = queries.length;
        return new Promise((resolve, reject) => {
            exports.pool.getConnection((e, c) => {
                if (e)
                    console.error('get pool Connection' + e);
                c.beginTransaction(err => {
                    if (err) {
                        console.error(err);
                        reject(err);
                    }
                    else {
                        async_1.default.waterfall(getBatchCallbacks(queries, c), (err, res) => {
                            if (err) {
                                console.error(err);
                                return c.rollback(null, () => { reject(err); });
                            }
                            c.commit(error => {
                                if (error) {
                                    console.error(error);
                                    return c.rollback(null, () => { reject(error); });
                                }
                                return resolve(res);
                            });
                        });
                    }
                });
            });
        }).catch((error) => {
            console.error('error batch query: ' + error);
            // handleDbError(error)
        });
    });
}
exports.batchQuery = batchQuery;
function getBatchCallbacks(querys, connection) {
    let i = querys.length;
    const arr = [];
    querys.forEach(q => {
        let f;
        if (i === querys.length) {
            f = function (callback) {
                connection.query(q.query, q.args, (err, results, fields) => {
                    if (err) {
                        console.error(err);
                        callback(err);
                    }
                    else {
                        callback(null, [results]);
                    }
                });
            };
        }
        else {
            f = function (previous, callback) {
                connection.query(q.query, q.args, (err, results, fields) => {
                    if (err) {
                        console.error(err);
                        callback(err);
                    }
                    else {
                        previous.push(results);
                        callback(null, previous);
                    }
                });
            };
        }
        i--;
        arr.push(f);
    });
    return arr;
}
// const insert = await db.pool.getConnection((err, connection) => {
//     connection.beginTransaction((err) => {
//         if (err) {
//             connection.rollback
//         }
//     })
// });
//# sourceMappingURL=db.js.map