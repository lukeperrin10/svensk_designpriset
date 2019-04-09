import * as express from 'express'
import multer from 'multer'
import {Md5} from 'ts-md5/dist/md5'


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './upload_assets/temp_images/')
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

export default (req: express.Request, res: express.Response) => {
    multerHandler.single('media')(req, res, (error: Error) => {
        if (error) {
            res.status(500).json({error: error.message})
        } else {
            res.json(req.file.filename)
        }
    })
}