import * as model from '../models/polls'
import {DPRouter} from './base_router'

const valid_params = ['id']


export const router = new DPRouter<model.Polls>(model, valid_params).activate()