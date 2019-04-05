import * as model from '../models/category'
import {DPRouter} from './base_router'

const valid_params = ['id']


export const router = new DPRouter<model.Category>(model, valid_params).activate()