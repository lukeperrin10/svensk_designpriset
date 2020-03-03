import * as category  from '../../src/models/category'
import  {Category} from '../../src/models/category'
import {Test} from '../base_endpoint'

const data: Category = {
    name: 'Test',
    shorttag: "123"
}
const category_test = new Test<Category>(category, data)
category_test.methods = ['GET']
category_test.endpoint = '/categories'
category_test.runAll()