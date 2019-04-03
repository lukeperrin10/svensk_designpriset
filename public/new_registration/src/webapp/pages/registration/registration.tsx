import * as React from 'react'
import {connect} from 'react-redux'
import { IState, IWinnerState } from 'src/webapp/model/state'
import { getWinners } from 'src/webapp/redux/actions/winners'
// import { IWinner } from 'src/webapp/model'
import FormContainer from './form_container'

interface ReduxProps {
    winners: IWinnerState
}

interface DispatchProps {
    getWinners: () => Promise<any>
}

type Props = ReduxProps & DispatchProps
interface State {}

class Registration extends React.Component<Props, State> {
    state = {
        didLoad: false
    }
    componentDidMount() {
       
        this.props.getWinners()
    }
    render() {
        return (
            <div>
                <FormContainer />
            </div>
        )
    }
}

const mapStateToProps = (state: IState) => {
    return {
        winners: state.winnerState
    }
}

const mapDispatchToProps = (dispatch: Function) => {
    return {
        getWinners: () => dispatch(getWinners())
    }
}

export default connect<ReduxProps, DispatchProps, {}, IState>(mapStateToProps, mapDispatchToProps)(Registration)