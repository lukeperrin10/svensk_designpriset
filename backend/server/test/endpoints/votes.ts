import * as votes  from '../../src/models/votes'
import  {Vote} from '../../src/models/votes'
import {Test} from '../base_endpoint'

const data: Vote = {
}
const votes_test = new Test<Vote>(votes, data)
votes_test.methods = ['GET']
votes_test.runAll()