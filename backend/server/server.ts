const express = require('express')
const app = express()
const util = require('util')
import logger from 'morgan'

require( "console-stamp" )( console, {pattern: "yyyy-mm-dd--HH:MM:ss"} );

// logger.token('date');
app.use(logger('[:date[iso]] [ACCESS] :req[x-forwarded-for] - :remote-user ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"'));

if (process.env.NODE_ENV === 'development') {
    app.use((req: any , res:any, next:any) => {
        // if (config.get<boolean>('allow_all_origins')) {
        //     res.header("Access-Control-Allow-Origin", req.get('origin'))
        // } else {
        //     //Add web domain later
        res.header("Access-Control-Allow-Origin", '*')
        // }
    
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
        res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS")
        res.header("Access-Control-Allow-Credentials", "true")
        next()
    });
}


const mysql = require('mysql')
const pool = mysql.createPool({
    connectionLimit: 9,
    host: process.env.DP_BACKEND_MYSQL_HOST,
    user: process.env.DP_BACKEND_MYSQL_USER,
    password: process.env.DP_BACKEND_MYSQL_PASSWORD,
    database: process.env.DP_BACKEND_MYSQL_DATABASE
})


const port = 8001

// req: any ger SyntaxError: Unexpected token :

app.get('/', (req: any, res: any) => {
    console.log('request')
    res.send('Hello World!')
    });

app.get('/winner', (req: any, res: any) => {
    pool.query('select * from winner_entries where id = 29731', (error: any, results: any, fields: any) => {
        if (error) throw error
            res.send(results)
    })
})

app.listen(port, () => console.log('Example app listening on port 8001!'));

function testDatabaseQuery() {
    
    pool.query('select * from winner_entries where id = 29731', (error: any, results: any, fields: any) => {
        if (error) throw error
            return results     
    })
    
}

function testDatabaseInsert(random_string: any) {
    pool.getConnection((err: any, connection: any) => {
        connection.beginTransaction((error: any) => {
            if (error) throw error
            connection.query(
                'INSERT INTO wopii_test_table SET random_string=?', 
                random_string, 
                (err: any, res: any, fields: any) => {
                    if (err) {
                        return pool.rollback(() => {
                            throw err
                        })
                    }
                    connection.commit((error: any) => {
                        if (error) {
                            return pool.rollback(() => {
                                throw error
                            })
                        }
                        console.log('success!')
                    })
            })
        })
    })
}
// testDatabaseInsert('tjena hejsan')
testDatabaseQuery()