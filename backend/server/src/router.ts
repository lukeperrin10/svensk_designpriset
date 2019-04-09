import {Express, Request, Response, NextFunction} from 'express'
import * as express from 'express'
import {router as winners} from './routes/winners'
import {router as entries} from './routes/entries'
import {router as profiles} from './routes/profiles'
import {router as categories} from './routes/category'
import multer from 'multer'



export function initRouter(app: Express) {
    console.log('init router')
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, './upload_assets/images/')
        },
        filename: (req, file, cb) => {
            cb(null, file.originalname)
        }
    })
    
    const multerHandler = multer({storage})
    const router = express.Router()
    router.post('/', multerHandler.single('image'), (req: express.Request, res: express.Response) => {
        console.log(req.body)
        res.json(req.file)
    })
    router.use('/winners', winners)
    router.use('/entries', entries)
    router.use('/profiles', profiles)
    router.use('/categories', categories)
    // router.use('/', (req, res) => {
    //     res.send('tjena hejsan')
    // })

    

    

    router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
        if (req.app.get('env') !== 'test') {   
            console.error(err)
        }
        // res.status(406 || 500).json(err);
    })
    
    app.use(router)
}




