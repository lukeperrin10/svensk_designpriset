import * as React from 'react'
import {connect} from 'react-redux'
import { IState} from 'src/webapp/model/state'
import FormContainer from './form_container'
import ConfirmationContainer from './confirmation_container'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

interface ReduxProps {
    
}

interface DispatchProps {
    
}

type Props = ReduxProps & DispatchProps
interface State {}

class Registration extends React.Component<Props, State> {
    state = {
        didLoad: false
    }
    componentDidMount() {
    }
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/" render={() => (<FormContainer />)}/>
                    <Route path="/bekrafta" render={() => (<ConfirmationContainer />)} />
                </Switch>
            </Router>
        )
    }
}

const mapStateToProps = (state: IState) => {
    return {
        
    }
}

const mapDispatchToProps = (dispatch: Function) => {
    return {
        
    }
}

export default connect<ReduxProps, DispatchProps, {}, IState>(mapStateToProps, mapDispatchToProps)(Registration)