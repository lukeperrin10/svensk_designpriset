import * as category  from '../../src/models/category'
import  {Category} from '../../src/models/category'
import {Test} from '../base_endpoint'

const data: Category = {
    name: 'Test',
    shorttag: "131",
    created: new Date().toISOString().slice(0, 19).replace('T', ' '),
    modified: new Date().toISOString().slice(0, 19).replace('T', ' '),
    active: true
}

const category_test = new Test<Category>(category, data)
category_test.methods = ['GET', 'GET_ID']
category_test.endpoint = '/categories'
category_test.table_name = 'categories'
category_test.runAll()