import {Express, Request, Response, NextFunction} from 'express'
import * as express from 'express'
import {router as winners} from './routes/winners'
import {router as entries} from './routes/entries'
import {router as profiles} from './routes/profiles'
import {router as categories} from './routes/category'
import TempAvatar from './file_handlers/temp_avatars'
import Avatars from './file_handlers/avatars'
import EntryMedia from './file_handlers/entry_media'



export function initRouter(app: Express) {
    console.log('init router')
    const router = express.Router()
    router.use('/winners', winners)
    router.use('/entries', entries)
    router.use('/profiles', profiles)
    router.use('/categories', categories)
    // router.use('/', (req, res) => {
    //     res.send('tjena hejsan')
    // })
    router.post('/avatar', Avatars)
    router.post('/temp_avatar', TempAvatar)
    router.post('/entry_media', EntryMedia)

    router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
        if (req.app.get('env') !== 'test') {   
            console.error(err)
        }
        // res.status(406 || 500).json(err);
    })
    
    app.use(router)
}




