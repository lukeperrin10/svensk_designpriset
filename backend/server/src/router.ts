import {Express, Request, Response, NextFunction} from 'express'
import * as express from 'express'
import {router as winners} from './routes/winners'
import {router as entries} from './routes/entries'

export function initRouter(app: Express) {
    console.log('init router')
    const router = express.Router()
    router.use('/winners', winners)
    router.use('/entries', entries)
    router.use('/', (req, res) => {
        res.send('tjena hejsan')
    })

    router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
        if (req.app.get('env') !== 'test') {   
            console.error(err)
        }
        // res.status(406 || 500).json(err);
    })

    app.use(router)
}