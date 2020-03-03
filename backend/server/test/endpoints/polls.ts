import * as polls  from '../../src/models/polls'
import  {Polls} from '../../src/models/polls'
import {Test} from '../base_endpoint'

const data: Polls = {
}
const polls_test = new Test<Polls>(polls, data)
polls_test.methods = ['GET']
polls_test.runAll()