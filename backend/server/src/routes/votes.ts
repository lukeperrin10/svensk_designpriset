import * as model from '../models/votes'
import {DPRouter} from './base_router'

const valid_params = ['secret']

class VoteRouter extends DPRouter<model.Vote> {
    post() {
        this.router.post('/', async (req, res) => {
            if (Array.isArray(req.body) && req.body.length > 1) {
                res.json(await (<typeof model>this.model).batchCreate(req.body))
            } else {
                res.json(await this.model.create(req.body[0]))
            }
        })
    }
}

export const router = new VoteRouter(model, valid_params).activate()