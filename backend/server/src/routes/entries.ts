import * as model from '../models/entries'
import {DPRouter} from './base_router'

const valid_params = ['id']


export const router = new DPRouter<model.Entry>(model, valid_params).activate()