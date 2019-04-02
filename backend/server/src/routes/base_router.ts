import * as express from 'express'
import {Router, Request} from 'express'
import {Model} from '../models/model'

// export type Methods = 'GET' | 'POST'

export class DPRouter<T> {

    router: Router
    model: Model<T>
    params: Array<string>

    constructor(model: Model<T>, params: Array<string>) {
        console.log('create DPRouter')
        this.router = express.Router()
        this.model = model
        this.params = params
    }

    public activate(): Router {
        console.log('DP Router activate')
        this.get()
        this.getId()
        this.put()
        this.post()
        return this.router
    }

    protected get() {
        
        this.router.get('/', async (req, res) => {
            console.log('DP Router get')
            console.log(req.query)
            res.json(await this.model.get(<T>req.query))
        })
    }

    protected getId() {
        this.router.get('/:id', async (req, res) => {
            console.log('DP Router get ID')
            res.json(await this.model.getId(req.params.id))
        })
    }
    // WARNING: Se över denna och POST
    protected put() {
        this.router.put('/:id', async (req, res) => {
            console.log('DP Router put')
            console.log(req.body)
            res.json(await this.model.update(<T>req.body))
        })
    }

    protected post() {
        this.router.post('/', async (req, res, next) => {
            console.log('DP Router get post')
            console.log(req.body)
            res.json(await this.model.create(<T>req.body))
        })
    }
}