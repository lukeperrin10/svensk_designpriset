import * as React from 'react'
import {connect} from 'react-redux'
import { IState, IProfileState} from 'src/webapp/model/state'
import FormContainer from './form_container'
import ConfirmationContainer from './confirmation_container'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import { INewProfile, INewEntry, IEntry, ICategory } from 'src/webapp/model';
import { saveProfile, getProfile } from 'src/webapp/redux/actions/profile';
import { getEntries, saveEntries } from 'src/webapp/redux/actions/entries';
import { getCategories } from 'src/webapp/redux/actions/categories';
import Spinner from 'react-bootstrap/Spinner'

interface ReduxProps {
    profileState: IProfileState,
    entries: IEntry[],
    categories: ICategory[]
}
interface DispatchProps {
    saveProfile: (p: INewProfile) => Promise<any>,
    getProfile: (i: number) => Promise<any>,
    getEntries: (p: number) => Promise<any>,
    saveEntries: (e: INewEntry[]) => Promise<any>,
    getCategories: () => Promise<any>
}
type Props = ReduxProps & DispatchProps
interface State {}

class Registration extends React.Component<Props, State> {
    state = {
        didLoad: false,
        didUpload: false
    }
    constructor(p: Props) {
        super(p)
        this.props.getCategories()
        .then(() => this.setState({didLoad: true}))
    }
    
    postContent = async (profile: INewProfile, entries: INewEntry[]) => {
        await this.props.saveProfile(profile)
        const {profileState} = this.props
        const pId = profileState.profile[0].id || false
        console.log(pId)
        if (pId) {
            await this.props.saveEntries(this.addProfileId(entries, pId))
            this.setState({didUpload: true})
        }
    }

    addProfileId(entries: INewEntry[], profileId: number) {
        entries.forEach(entry => {
            entry.profile_id = profileId
        })
        console.log(entries)
        return entries
    }

    render() {
        const {categories} = this.props
        const {didLoad} = this.state
        return (
            <Router>
                {!didLoad ?
                <div>
                    <Spinner animation="border" />
                </div>
                :
                <Switch>
                    <Route exact path="/" render={() => (<FormContainer categories={categories} saveContent={this.postContent} />)}/>
                    <Route path="/bekraftelse" render={() => (<ConfirmationContainer />)} />
                </Switch>
                }
            </Router>
        )
    }
}

const mapStateToProps = (state: IState) => {
    return {
        profileState: state.profileState,
        entries: state.entriesState.entries,
        categories: state.categoryState.categories
    }
}

const mapDispatchToProps = (dispatch: Function) => {
    return {
        saveProfile: (profile: INewProfile) => dispatch(saveProfile(profile)),
        getProfile: (id: number) => dispatch(getProfile(id)),
        getEntries: (profile_id: number) => dispatch(getEntries(profile_id)),
        saveEntries: (entries: INewEntry[]) => dispatch(saveEntries(entries)),
        getCategories: () => dispatch(getCategories())
    }
}

export default connect<ReduxProps, DispatchProps, {}, IState>(mapStateToProps, mapDispatchToProps)(Registration)