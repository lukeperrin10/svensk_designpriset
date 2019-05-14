import * as express from 'express'
import multer from 'multer'
import Uniqid from 'uniqid'
import { TEMP_AVATAR_PATH } from '../constants/temp_contants';
import gm from 'gm'
let imageMagick = gm.subClass({imageMagick: true})

const folderPath = TEMP_AVATAR_PATH+'/'

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
        fieldSize: 10000000
    }
})

export default (req: express.Request, res: express.Response) => {
    multerHandler.single('media')(req, res, (error: Error) => {
        if (error) {
            res.status(500).json({error: error.message})
        } else {
            const filePath = `${folderPath}${req.file.filename}`
            cropImage(filePath, () => {
                res.json(req.file.filename)
            })
        }
    })
}

function cropImage(filename: string, callBack: Function) {
    const endWidth = 770
    const endHeight = 1030

    let newWidth = 0
    let newHeigth = 0

    imageMagick(filename).size((err, val) => {
        if (err) console.error(err)
        newWidth = val.width
        newHeigth = val.height
        console.log('new Width: '+newWidth)
        console.log('new Height: '+newHeigth)
        const ratio = 1030 / newHeigth
        console.log('ratio: '+ratio)
        newHeigth = newHeigth * ratio
        newWidth = newWidth * ratio
        console.log('new Width: '+newWidth)
        console.log('new Height: '+newHeigth)
        const x = newWidth - endWidth / 2

        imageMagick(filename)
            .gravity('Center')
            .resize(newWidth,newHeigth)
            .crop(endWidth, endHeight,0,0)
            .write(filename, err => {
                if (err) console.error(err)
                callBack()
            })
    })
    
}