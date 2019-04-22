// const mysql = require('mysql')
import mysql, { Connection, PoolConnection } from 'mysql'
import Async, { nextTick, AsyncResultCallback } from 'async'
import {STR_ID, DBError} from './error'

export interface DBErrorMapping {
    [key: string]: STR_ID
}

export function handleDbError(err: Error, map?: Array<DBErrorMapping>) {
    if (!map) map = []
    function getFromMap(key: STR_ID) {
        for (let i = 0 ; i < map.length ; i++) {
            for (let o in map[i]) {
                if (o == key) return map[i][o] 
            }
        }
        return key
    }
    const code = parseInt((<any>err).code)
    const new_err = new DBError(err.message, 'DB_ERROR', code)
    switch (code) {
        case 23505: new_err.str_id = getFromMap('DUPLICATE_KEY')
                    new_err.status_code = 400
    }
    throw new_err
}

export const pool = mysql.createPool({
    connectionLimit: 9,
    host: process.env.DP_BACKEND_MYSQL_HOST,
    user: process.env.DP_BACKEND_MYSQL_USER,
    password: process.env.DP_BACKEND_MYSQL_PASSWORD,
    database: process.env.DP_BACKEND_MYSQL_DATABASE
})

export async function query(query: string, args?: any[]): Promise<any> {
    console.log('db query')
    console.log(args)
    return new Promise((resolve, reject) => {
        pool.query(query, args, (error: any, results: any, fields: any) => {
            if (error) {
                handleDbError(error)
            } else {
                resolve(results)
            }
        }) 
    })
}
export interface queryObj {
    query: string,
    args?: any[],
}
export async function batchQuery(queries: queryObj[]): Promise<any> {
    let i = queries.length
    return new Promise((resolve, reject) => {
        pool.getConnection((e, c) => {
            c.beginTransaction(err => {
                if (err) {
                    reject(err)
                } else {
                    Async.waterfall(getBatchCallbacks(queries, c), (err, res) => {
                        if (err) {
                            return c.rollback()
                        }
                        c.commit(error => {
                            if (error) {
                                return c.rollback
                            }
                            return resolve(res)
                        })
                    })
                }
            })
        })
    })
}

function getBatchCallbacks(querys: queryObj[], connection: PoolConnection) {
    let i = querys.length
    const arr: Function[] = []
    querys.forEach(q => {
        let f: Function
        if (i === querys.length) {
            f = function (callback: any) { 
                connection.query(q.query, q.args, (err, results, fields) => {
                    if (err) {
                        callback(err)
                    } else {
                        callback(null, [results])
                    }
                })
            }
        } else {
            f = function (previous: any[], callback: any) { 
                connection.query(q.query, q.args, (err, results, fields) => {
                    if (err) {
                        callback(err)
                    } else {
                        previous.push(results)
                        callback(null, previous)
                    }
                })
            }
        }
        i--
        arr.push(f)
        
    })
    return arr
}

// const insert = await db.pool.getConnection((err, connection) => {
//     connection.beginTransaction((err) => {
//         if (err) {
//             connection.rollback
//         }
//     })
// });