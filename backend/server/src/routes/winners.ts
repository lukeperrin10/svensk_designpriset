import * as model from '../models/winners'
import {DPRouter} from './base_router'

const valid_params = ['id', 'year']

class WinnersRouter extends DPRouter<model.Winner> {
    // get() {
    //     this.router.get('/', async (req, res) => {
    //         console.log('DP Router get')
    //         console.log(req.query)
    //         res.json(await this.model.getYear(req.query.year))
    //     })
    // }
}


export const router = new WinnersRouter(model, valid_params).activate()