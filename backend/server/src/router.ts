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
import { Entry } from 'dbtypes';
import { MFError } from './error';

const tempProfile = {
    id: 1234,
    secret: 'secret',
    contact: 'WOPII TEST',
    company: 'WOPII TEST',
    address: 'WOPII TEST',
    zip: '12345',
    city: 'WOPII TEST',
    phone: '00000111122',
    mail: 'johan.g.hjalmarsson@gmail.com',
    homepage: 'WOPII TEST',
    created: 'WOPII TEST',
    modified: 'WOPII TEST',
    invoice_paid: 0
}

const tempEntries : Entry[] = [
    {
    id: 121212,
    profile_id: 1234,
    secret: 'secret',
    entry_name: 'WOPII TEST',
    category: 'WOPII TEST',
    source: 'WOPII TEST',
    designer: 'WOPII TEST',
    illustrator: 'WOPII TEST',
    leader: 'WOPII TEST',
    customer: 'WOPII TEST',
    created: 'WOPII TEST',
    modified: 'WOPII TEST',
    avatar: 'WOPII TEST',
    format: 'WOPII TEST',
    size: 'WOPII TEST',
    webpage: 'WOPII TEST',
    is_winner_gold: 0,
    is_winner_silver: 0,
    is_nominated: 0,
    sent_nominee_notification: 'WOPII TEST',
    motivation: 'WOPII TEST',
    year: 'WOPII TEST'
    },
    {
        id: 1212121,
        profile_id: 1234,
        secret: 'secret',
        entry_name: 'WOPII TEST',
        category: 'WOPII TEST',
        source: 'WOPII TEST',
        designer: 'WOPII TEST',
        illustrator: 'WOPII TEST',
        leader: 'WOPII TEST',
        customer: 'WOPII TEST',
        created: 'WOPII TEST',
        modified: 'WOPII TEST',
        avatar: 'WOPII TEST',
        format: 'WOPII TEST',
        size: 'WOPII TEST',
        webpage: 'WOPII TEST',
        is_winner_gold: 0,
        is_winner_silver: 0,
        is_nominated: 0,
        sent_nominee_notification: 'WOPII TEST',
        motivation: 'WOPII TEST',
        year: 'WOPII TEST'
        }
]

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
    router.post('/temp_entry_media',TempEntryMedia)

    router.use((err: MFError, req: Request, res: Response, next: NextFunction) => {
        if (req.app.get('env') !== 'test') {
            console.error(err)
        }
        /*
        if (req.app.get('env') !== 'development' && req.app.get('env') !== 'test') {
            delete err.stack;
        }
        */
        
        res.status(err.status_code || 500).json(err);
    })

    // const test = mail('johan.g.hjalmarsson@gmail.com', 'test mail', 'text', getRegisterMailContent(false, 'en url', tempProfile, tempEntries)).catch(err => console.log(err))
    // const test = mail('johan.g.hjalmarsson@gmail.com', 'test admin mail', 'text', getRegisterMailAdminContent(false, 'en url', tempProfile, tempEntries)).catch(err => console.log(err))
    // console.log(test)
    
    app.use(router)
}




