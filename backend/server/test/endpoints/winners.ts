import * as winners  from '../../src/models/winners'
import  {Winner} from '../../src/models/winners'
import {Test} from '../base_endpoint'

const data: Winner = {
}
const winners_test = new Test<Winner>(winners, data)
winners_test.methods = ['GET']
winners_test.runAll()