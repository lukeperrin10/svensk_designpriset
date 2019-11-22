import * as model from '../models/votes'
import {DPRouter} from './base_router'

const valid_params = ['id']

export const router = new DPRouter<model.Vote>(model, valid_params).activate()