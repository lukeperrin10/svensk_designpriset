import * as model from '../models/content'
import {DPRouter} from './base_router'

const valid_params = ['id']


export const router = new DPRouter<model.Content>(model, valid_params).activate()