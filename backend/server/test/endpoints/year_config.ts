import * as year_config  from '../../src/models/year_config'
import  {YearConfig} from '../../src/models/year_config'
import {Test} from '../base_endpoint'

const data: YearConfig = {
}
const year_config_test = new Test<YearConfig>(year_config, data)
year_config_test.methods = ['GET']
year_config_test.endpoint = '/config'
year_config_test.runAll()