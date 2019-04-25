const express = require('express')
const app = express()
const util = require('util')
require('express-async-errors');
import logger from 'morgan'
import {initRouter} from './src/router'
import * as bodyParser from 'body-parser'

require( "console-stamp" )( console, {pattern: "yyyy-mm-dd--HH:MM:ss"} );

// logger.token('date');
app.use(logger('[:date[iso]] [ACCESS] :req[x-forwarded-for] - :remote-user ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"'));
app.use(bodyParser.json())                                     
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.text())                            
app.use(bodyParser.json({ type: 'application/json'}))

// process.on('unhandledRejection', (reason, promise) => {
//     console.log('Unhandled Rejection at:', reason || reason)
//     // Recommended: send the information to sentry.io
//     // or whatever crash reporting service you use
//   })
//
if (process.env.NODE_ENV === 'development') {
    app.use((req: any , res:any, next:any) => {
        // if(req.method === 'OPTIONS') {
        //     console.log('!OPTIONS');
        // const headers = {
        //     ["Access-Control-Allow-Origin"]: "*",
        //     ["Access-Control-Allow-Methods"]: "POST, GET, PUT, DELETE, OPTIONS",
        //     ["Access-Control-Allow-Credentials"]: false,
        //     ["Access-Control-Max-Age"]: '86400', // 24 hours
        //     ["Access-Control-Allow-Headers"]: "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept"
        // };
        // // IE8 does not allow domains to be specified, just the *
        // // headers["Access-Control-Allow-Origin"] = req.headers.origin;
        // res.writeHead(200, headers);
        // res.end();
        // } else {
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
        // }
        
    });
}


const port = 8001

initRouter(app)

app.listen(port, () => {
    console.log('Server listening on port 8001!')
    console.log('Node env: '+process.env.NODE_ENV)
});

