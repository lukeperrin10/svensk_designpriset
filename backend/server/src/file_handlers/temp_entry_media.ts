import * as express from 'express'
import multer from 'multer'
import fs from 'fs';
import path from 'path'
import { replaceSpaces } from './replacer';

const folderPath = './upload_assets/temp_media/'

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, folderPath)
    },
    filename: (req, file, cb) => {
        console.log(file.originalname)
        const originalName = replaceSpaces(file.originalname)
        const ext = originalName.toLocaleLowerCase().split('.').pop()
        const name = originalName.toLocaleLowerCase().split('.')[0]
        let fileName = originalName
        let exists = true
        let i = 0
        while (exists) {
            if(fs.existsSync(`${folderPath}${fileName}`)) {
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
        const ext = path.extname(file.originalname)
        if(ext === '.pdf')
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