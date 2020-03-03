import * as express from 'express'
import {Router, Request} from 'express'
import {Model} from '../models/model'

// export type Methods = 'GET' | 'POST'

export class DPRouter<T> {

    router: Router
    model: Model<T>
    params: Array<string>

    constructor(model: Model<T>, params: Array<string>) {
        this.router = express.Router()
        this.model = model
        this.params = params
    }

    public activate(): Router {
        this.get()
        this.getId()
        this.put()
        this.post()
        this.delete()
        return this.router
    }

    protected delete() {
        this.router.delete('/:id', (req, res) => {
            res.status(400).json('You are not allowed to delete')
        })
    }

    protected get() {
        
        this.router.get('/', async (req, res) => {
            console.log(req.query)
            res.json(await this.model.get(<T>req.query))
        })
    }

    protected getId() {
        this.router.get('/:id', async (req, res) => {
            res.json(await this.model.getId(req.params.id))
        })
    }
    // WARNING: Se över denna och POST
    protected put() {
        this.router.put('/:id', async (req, res) => {
            if (!('id' in req.params)) {
                res.status(400).json('Put request should contain an id')
            }
            if (req.params.id != req.body.id) {
                res.status(400).json('Id doesnt match widh body')
            }
            res.json(await this.model.update(<T>req.body))
        })
    }

    protected post() {
        this.router.post('/', async (req, res, next) => {
            res.json(await this.model.create(<T>req.body))
        })
    }
}