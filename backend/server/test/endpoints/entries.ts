import * as entries  from '../../src/models/entries'
import  {Entry} from '../../src/models/entries'
import {Test} from '../base_endpoint'

const data: Entry = {
}
const entry_test = new Test<Entry>(entries, data)
entry_test.methods = ['GET']
entry_test.runAll()