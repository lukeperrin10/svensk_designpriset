// const mysql = require('mysql')
import mysql from 'mysql'


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
                reject(error)
            } else {
                resolve(results)
            }
        }) 
    })
}