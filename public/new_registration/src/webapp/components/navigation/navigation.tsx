import * as React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Registration from 'src/webapp/pages/registration'
import Vote from 'src/webapp/pages/vote'

const Navigation = () => {
    return (
        <Router>
            <Switch>
                <Route path='/rostning' component={Vote} />
                <Route path='/anmalan' component={Registration} />
            </Switch>
        </Router>
    )
}

export default Navigation