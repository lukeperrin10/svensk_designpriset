import * as React from 'react'
import {connect} from 'react-redux'
import { IState, IProfileState} from 'src/webapp/model/state'
import FormContainer from './form_container'
import ConfirmationContainer from './confirmation_container'
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom'
import { INewProfile, INewEntry, IEntry, ICategory } from 'src/webapp/model';
import { saveProfile, getProfile } from 'src/webapp/redux/actions/profile';
import { getEntries, saveEntries } from 'src/webapp/redux/actions/entries';
import { getCategories } from 'src/webapp/redux/actions/categories';
import Spinner from 'react-bootstrap/Spinner'
import { ROOT_URL } from 'src/webapp/config/host';
import * as queryString from 'query-string'

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
        didUpload: false,
        edit:false,
        editIsAdmin: false,
        editId: undefined,
        editSecret: undefined,
        editProfile: {},
        editEntries: []
    }
    constructor(p: Props) {
        super(p)
        // localStorage.clear()
    }

    componentDidMount() {
        this.extractQuery()
        this.props.getCategories()
        .then(() => this.getContent())
        .then(() => this.setState({didLoad: true}))
    }

    async getContent() {
        const query = queryString.parse(location.search)
        if (('id' in query) && ('secret' in query)) {
            if (query.id) {
                const id = parseInt(query.id as string)
                await this.props.getProfile(id)
                const profile = this.props.profileState.profile[0]
                if (profile.secret === query.secret) {
                    this.setState({edit: true})
                    await this.props.getEntries(profile.id)
                }
            }
        }

        if ('adm' in query && query['adm'] === 'true') {
            this.setState({editIsAdmin: true})
        }
        
    }

    getEditContent() {
        return {
            profile: this.props.profileState.profile[0],
            entries: this.props.entries
        }
    }

    extractQuery() {
        const query = queryString.parse(location.search)
        if (('id' in query) && ('secret' in query)) {
            this.setState({edit: true})
        }
        if ('adm' in query && query['adm'] === 'true') {
            this.setState({editIsAdmin: true})
        }
    }

    generateUserLink(id: number, secret: string) {
        console.log(`gen user:  id: ${id}, secret: ${secret}`)
        return `${ROOT_URL}/edit?id=${id}&secret=${secret}`
    }

    generateAdminLink(id: number, secret: string) {
        console.log(`gen admin:  id: ${id}, secret: ${secret}`)
        return `${ROOT_URL}/edit?id=${id}&secret=${secret}&adm=true`
    }
    
    postContent = async (profile: INewProfile, entries: INewEntry[]) => {
        await this.props.saveProfile(profile)
        const {profileState} = this.props
        const pId = profileState.profile[0].id || false
        console.log(pId)
        if (pId) {
            await this.props.saveEntries(this.addProfileId(entries, pId))
            if (this.props.profileState.profile[0]) {
                const profile = this.props.profileState.profile[0]
                const userLink = this.generateUserLink(profile.id, profile.secret)
                const adminLink = this.generateAdminLink(profile.id, profile.secret)
                console.log(userLink)
                console.log(adminLink)
            }
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
        const {didLoad, didUpload, edit, editIsAdmin} = this.state
        return (
            <Router>
                {!didLoad ?
                <div>
                    <Spinner animation="border" />
                </div>
                :
                <Switch>
                    <Route exact path="/" render={() => (
                        <div>
                            <FormContainer adminMode={false} categories={categories} saveContent={this.postContent} />
                            {didUpload ? <Redirect to='/bekraftelse' /> : null}
                        </div>
                        )
                    }/>
                    <Route exact path="/edit" render={() => (
                        <div>
                            <FormContainer adminMode={editIsAdmin} editContent={edit ? this.getEditContent() : undefined} categories={categories} saveContent={this.postContent} />
                            {didUpload ? <Redirect to='/bekraftelse' /> : null}
                        </div>
                        )
                    }/>
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