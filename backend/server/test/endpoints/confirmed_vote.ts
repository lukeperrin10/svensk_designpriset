import * as confirmed_vote  from '../../src/models/confirmed_vote'
import  {ConfirmedVote} from '../../src/models/confirmed_vote'
import {Test} from '../base_endpoint'

const data: ConfirmedVote = {
    secret: "123"
}
/*
const confirmed_vote_test = new Test<ConfirmedVote>(confirmed_vote, data)
confirmed_vote_test.methods = ['PUT']
confirmed_vote_test.runAll()
*/