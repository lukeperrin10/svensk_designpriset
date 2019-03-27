"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const app = express();
const util = require('util');
const morgan_1 = __importDefault(require("morgan"));
require("console-stamp")(console, { pattern: "yyyy-mm-dd--HH:MM:ss" });
// logger.token('date');
app.use(morgan_1.default('[:date[iso]] [ACCESS] :req[x-forwarded-for] - :remote-user ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"'));
const mysql = require('mysql');
const pool = mysql.createPool({
    connectionLimit: 9,
    host: process.env.DP_BACKEND_MYSQL_HOST,
    user: process.env.DP_BACKEND_MYSQL_USER,
    password: process.env.DP_BACKEND_MYSQL_PASSWORD,
    database: process.env.DP_BACKEND_MYSQL_DATABASE
});
const port = 8001;
// req: any ger SyntaxError: Unexpected token :
app.get('/', (req, res) => {
    console.log('request');
    res.send('Hello World!');
});
app.get('/winner', (req, res) => {
    pool.query('select * from winner_entries where id = 29731', (error, results, fields) => {
        if (error)
            throw error;
        res.send(results);
    });
});
app.listen(port, () => console.log('Example app listening on port 8001!'));
function testDatabaseQuery() {
    pool.query('select * from winner_entries where id = 29731', (error, results, fields) => {
        if (error)
            throw error;
        return results;
    });
}
function testDatabaseInsert(random_string) {
    pool.getConnection((err, connection) => {
        connection.beginTransaction((error) => {
            if (error)
                throw error;
            connection.query('INSERT INTO wopii_test_table SET random_string=?', random_string, (err, res, fields) => {
                if (err) {
                    return pool.rollback(() => {
                        throw err;
                    });
                }
                connection.commit((error) => {
                    if (error) {
                        return pool.rollback(() => {
                            throw error;
                        });
                    }
                    console.log('success!');
                });
            });
        });
    });
}
// testDatabaseInsert('tjena hejsan')
testDatabaseQuery();
//# sourceMappingURL=server.js.map