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
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
})

// pool.on('acquire', (connection) => {
//     console.log('POOL ACQUIRE ----------------------------------- Connection %d acquired', connection.threadId)
// })

// pool.on('connection', (connection) => {
//     console.log('POOL CONNECTION ----------------------------------- Connection %d acquired', connection.threadId)
// })

// pool.on('enqueue', () => {
//     console.log('POOL ENQUEUE ----------------------------------- Waiting for available connection slot')
// })

// pool.on('release', (connection) => {
//     console.log('POOL RELEASE ----------------------------------- Connection %d released', connection.threadId)
// })

export async function query(query: string, args?: any[]): Promise<any> {
    if (process.env.NODE_MODE != 'testing') console.log('DB QUERY: '+query)
    return new Promise((resolve, reject) => {
        pool.query(query, args, (error: any, results: any, fields: any) => {
            if (error) {
                console.error(error)
                reject(error)
            } else {
                resolve(results)
            }
        })
    }).catch((error) => {
        console.error('error single query: ' +error)
        handleDbError(error)
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
            if (e) console.error('get pool Connection'+e)
            c.beginTransaction(err => {
                if (err) {
                    console.error(err)
                    reject(err)
                } else {
                    Async.waterfall(getBatchCallbacks(queries, c), (err, res) => {
                        if (err) {
                            console.error(err)
                            return c.rollback(null, () => {reject(err)})
                        }
                        c.commit(error => {
                            if (error) {
                                console.error(error)
                                return c.rollback(null, () => {reject(error)})
                            }
                            // Såklart att du måste release kopplingen, dumhövve...
                            c.release()
                            return resolve(res)
                        })
                    })
                }
            })
        })
    }).catch((error) => {
        console.error('error batch query: ' +error)
        handleDbError(error)
        // handleDbError(error)
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
                        console.error(err)
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
                        console.error(err)
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