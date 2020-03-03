import * as profiles  from '../../src/models/profiles'
import  {Profile} from '../../src/models/profiles'
import {Test} from '../base_endpoint'

const data: Profile = {
}
const profiles_test = new Test<Profile>(profiles, data)
profiles_test.methods = ['GET']
profiles_test.runAll()