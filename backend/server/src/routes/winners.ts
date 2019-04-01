import * as model from '../models/winners'
import {DPRouter} from './base_router'

const valid_params = ['id']


export const router = new DPRouter<model.Winner>(model, valid_params).activate()