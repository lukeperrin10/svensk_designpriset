import * as model from '../models/profiles'
import {DPRouter} from './base_router'

const valid_params = ['id']


export const router = new DPRouter<model.Profile>(model, valid_params).activate()