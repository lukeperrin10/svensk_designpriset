import * as content  from '../../src/models/content'
import  {Content} from '../../src/models/content'
import {Test} from '../base_endpoint'

const data: Content = {
}
const content_test = new Test<Content>(content, data)
content_test.methods = ['GET']
content_test.runAll()