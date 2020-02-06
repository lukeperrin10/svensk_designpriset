import * as model from '../models/year_config'
import {DPRouter} from './base_router'


const valid_params = ['id']


export const router = new DPRouter<model.YearConfig>(model, valid_params).activate()