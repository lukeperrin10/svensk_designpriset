import * as React from 'react'
import {connect} from 'react-redux'
import { IState } from 'src/webapp/model/state';
import { getWinners } from 'src/webapp/redux/actions/winners';
import { IWinner } from 'src/webapp/model';

interface ReduxProps {
    winners: IWinner[]
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
       
        
    }
    render() {
        return (
            <div>
                
            </div>
        )
    }
}

const mapStateToProps = (state: IState) => {
    return {
        winners: state.winnerState.winners
    }
}

const mapDispatchToProps = (dispatch: Function) => {
    return {
        getWinners: () => dispatch(getWinners())
    }
}

export default connect<ReduxProps, DispatchProps, {}, IState>(mapStateToProps, mapDispatchToProps)(Registration)