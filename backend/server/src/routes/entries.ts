import * as model from '../models/entries'
import {DPRouter} from './base_router'

const valid_params = ['id']

class EntriesRouter extends DPRouter<model.Entry> {
    post() {
        this.router.post('/', async (req, res) => {
            if (Array.isArray(req.body)) {
                res.json(await (<typeof model>this.model).batchCreate(req.body))
            } else {
                res.json(await this.model.create(req.body))
            }
        })
    }
}

export const router = new EntriesRouter(model, valid_params).activate()