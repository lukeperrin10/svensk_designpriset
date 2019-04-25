import * as model from '../models/entries'
import {DPRouter} from './base_router'

const valid_params = ['id']

class EntriesRouter extends DPRouter<model.Entry> {
    post() {
        this.router.post('/', async (req, res) => {
            console.log(req.body)
            if (Array.isArray(req.body) && req.body.length > 1) {
                res.json(await (<typeof model>this.model).batchCreate(req.body))
            } else {
                res.json(await this.model.create(req.body[0]))
            }
        })
    }
    put() {
        this.router.put('/:id', async (req, res) => {
            console.log(req.params.id)
            console.log(req.body.id)
            if (!('id' in req.params)) {
                res.status(400).json('Put request should contain an id')
            }
            if (req.params.id != req.body[0].profile_id) {
                res.status(400).json('Id doesnt match width body')
            } 
            if (Array.isArray(req.body) && req.body.length > 1) {
                res.json(await (<typeof model>this.model).batchUpdate(req.body))
            } else {
                res.json(await this.model.update(req.body[0]))
            }
            
        })
    }

}

export const router = new EntriesRouter(model, valid_params).activate()