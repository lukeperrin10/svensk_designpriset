import * as model from '../models/confirmed_vote'
import {DPRouter} from './base_router'

const valid_params = ['id']


export const router = new DPRouter<model.ConfirmedVote>(model, valid_params).activate()