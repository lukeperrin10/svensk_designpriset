import {Express, Request, Response, NextFunction} from 'express'
import * as express from 'express'
import {router as winners} from './routes/winners'
import {router as entries} from './routes/entries'
import {router as profiles} from './routes/profiles'
import {router as categories} from './routes/category'
import TempAvatar from './file_handlers/temp_avatars'
import Avatars from './file_handlers/avatars'
import EntryMedia from './file_handlers/entry_media'
import TempEntryMedia from './file_handlers/temp_entry_media'
import { MFError, NotFound } from './error';

export function initRouter(app: Express) {
    console.log('init router')
    const router = express.Router()
    // router.use('/winners', winners)
    router.use('/entries', entries)
    router.use('/profiles', profiles)
    router.use('/categories', categories)
    router.post('/avatar', Avatars)
    router.post('/temp_avatar', TempAvatar)
    router.post('/entry_media', EntryMedia)
    router.post('/temp_entry_media',TempEntryMedia)
    
    router.use((req, res) => {
        res.status(404).json(new NotFound)
    })

    router.use((err: MFError, req: Request, res: Response, next: NextFunction) => {
        if (req.app.get('env') !== 'test') {
            console.error(err)
        }
        /*
        if (req.app.get('env') !== 'development' && req.app.get('env') !== 'test') {
            delete err.stack;
        }
        */
        console.log('router middleware: '+err)
        
        res.status(err.status_code || 500).json(err);
        next(err)
    })

    app.use(router)
}




