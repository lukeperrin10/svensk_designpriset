import {Express, Request, Response, NextFunction} from 'express'
import * as express from 'express'
import {router as winners} from './routes/winners'
import {router as entries} from './routes/entries'
import {router as profiles} from './routes/profiles'
import {router as categories} from './routes/category'
import multer from 'multer'
import {Md5} from 'ts-md5/dist/md5'



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

    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, './upload_assets/images/')
        },
        filename: (req, file, cb) => {
            cb(null, `avatar-x${Md5.hashStr(''+Date.now())}.${file.originalname.toLocaleLowerCase().split('.').pop()}`)
        }
    })
    
    const multerHandler = multer({
        storage: storage,
        fileFilter: (req, file, cb) => {
            if(file.mimetype.startsWith('image'))
                cb(null, true);
            else {
                cb(new Error("NOT_IMAGE"), false);
            }
        },
        limits: {
            fieldSize: 4194304
        }
    })

    const tempStorage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, './upload_assets/temp_images/')
        },
        filename: (req, file, cb) => {
            cb(null, `avatar-x${Md5.hashStr(''+Date.now())}.${file.originalname.toLocaleLowerCase().split('.').pop()}`)
        }
    })
    
    const tempMulterHandler = multer({
        storage: tempStorage,
        fileFilter: (req, file, cb) => {
            if(file.mimetype.startsWith('image'))
                cb(null, true);
            else {
                cb(new Error("NOT_IMAGE"), false);
            }
        },
        limits: {
            fieldSize: 4194304
        }
    })
    // WARNING: Bryt ut det här 
    router.post('/assets', (req: express.Request, res: express.Response) => {
        multerHandler.single('image')(req, res, (error: Error) => {
            if (error) {
                res.status(500).json({error: error.message})
            } else {
                res.json(req.file.filename)
            }
        })
    })

    router.post('/temp_assets', (req: express.Request, res: express.Response) => {
        tempMulterHandler.single('temp_image')(req, res, (error: Error) => {
            if (error) {
                res.status(500).json({error: error.message})
            } else {
                res.json(req.file.filename)
            }
        })
    })

    router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
        if (req.app.get('env') !== 'test') {   
            console.error(err)
        }
        // res.status(406 || 500).json(err);
    })
    
    app.use(router)
}




