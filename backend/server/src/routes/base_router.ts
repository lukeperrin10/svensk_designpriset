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
        return this.router
    }

    protected get() {
        console.log('DP Router get')
        this.router.get('/', async (req, res) => {
            res.json(await this.model.get(<T>req.params))
        })
    }
}