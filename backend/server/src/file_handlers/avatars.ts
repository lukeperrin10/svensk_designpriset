import * as express from 'express'
import multer from 'multer'
import Uniqid from 'uniqid'
import { AVATAR_PATH } from '../constants/temp_contants';

const folderPath = AVATAR_PATH+'/'

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, folderPath)
    },
    filename: (req, file, cb) => {
        cb(null, `avatar-${Uniqid('x')}.${file.originalname.toLocaleLowerCase().split('.').pop()}`)
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
            console.error(error)
            res.status(500).json({error: error.message})
        } else {
            res.json(req.file.filename)
        }
    })
}