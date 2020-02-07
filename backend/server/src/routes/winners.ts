import * as model from '../models/winners'
import {DPRouter} from './base_router'

const valid_params = ['id', 'year']

class WinnersRouter extends DPRouter<model.Winner> {
    get() {
        this.router.get('/', async (req, res) => {
            console.log('DP Router get')
            console.log(req.query)
            if (req.query.year) {
                if (req.query.year.length === 4 && parseInt(req.query.year) !== NaN) {
                    res.json(
                        await (<typeof model>this.model)
                        .getYear(req.query.year, req.query.phase && req.query.phase)
                    )
                } else {
                    res.status(400).json('Year format should be YYYY (2019)')
                }
            } else {
                res.json(await this.model.get(req.query))
            }
        })
     }
}


export const router = new WinnersRouter(model, valid_params).activate()