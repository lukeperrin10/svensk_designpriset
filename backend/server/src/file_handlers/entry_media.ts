import * as express from 'express'
import multer from 'multer'
import {Md5} from 'ts-md5/dist/md5'
import fs from 'fs';

const path = './upload_assets/media/'

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path)
    },
    filename: (req, file, cb) => {
        // const existingFile = `${path}${file.originalname}`
        const ext = file.originalname.toLocaleLowerCase().split('.').pop()
        const name = file.originalname.toLocaleLowerCase().split('.')[0]
        let fileName = file.originalname
        let exists = true
        let i = 0
        while (exists) {
            if(fs.existsSync(`${path}${fileName}`)) {
                i++
                fileName = `${name}_${i}.${ext}`
            } else {
                exists = false
            }
        }
        cb(null, fileName)
    }
})


const multerHandler = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if(file.originalname.toLocaleLowerCase().split('.').pop() !== 'pdf')
            cb(null, true);
        else {
            cb(new Error("NOT_PDF"), false);
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