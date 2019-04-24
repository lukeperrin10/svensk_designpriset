import * as React from 'react'
import {connect} from 'react-redux'
import { IState, IProfileState, IEntriesState, ICategoryState} from 'src/webapp/model/state'
import FormContainer from './form_container'
import ConfirmationContainer from './confirmation_container'
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom'
import { INewProfile, INewEntry } from 'src/webapp/model';
import { saveProfile, getProfile } from 'src/webapp/redux/actions/profile';
import { getEntries, saveEntries } from 'src/webapp/redux/actions/entries';
import { getCategories } from 'src/webapp/redux/actions/categories';
import Spinner from 'react-bootstrap/Spinner'
// import { ROOT_URL } from 'src/webapp/config/host';
import * as queryString from 'query-string'
import RegistrationInfo from './registration_info';
import ErrorModal from './error_modal/error_modal';
import styles from './style'
import { DID_POST_FORM } from 'src/webapp/model/constants';
import { OLD_REGISTRATION_URL } from 'src/webapp/config/host';
import logo from '../../assets/img/logo.png'

interface ReduxProps {
    profileState: IProfileState,
    entriesState: IEntriesState,
    categoriesState: ICategoryState
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

const Loader = () => {
    return (
        <div style={styles.spinner}>
            <img src={logo} alt='Logo' />
            <Spinner animation="border" />
            <div style={styles.loadingText}>
                <p>Laddar sidan...</p>
                <p>Tar detta väldigt lång tid?</p>
                <p>Vänligen kontakta info@designpriset.se eller använd den gamla registreringen <a href={OLD_REGISTRATION_URL}>här</a> </p>
            </div>
        </div>
    )
}

class Registration extends React.Component<Props, State> {
    state = {
        didLoad: false,
        didUpload: false,
        edit:false,
        editIsAdmin: false,
        editId: undefined,
        editSecret: undefined,
        editProfile: {},
        editEntries: [],
        showErrorModal: false,
        isAllowed: this.isAllowed()
    }
    constructor(p: Props) {
        super(p)
        // localStorage.clear()
    }

    isAllowed() {
        const query = queryString.parse(location.search)
        return 'wopii_dev' in query
    }

    componentDidMount() {
        this.checkLocalStorage()
        this.extractQuery()
        this.props.getCategories()
        .then(() => this.getContent())
        .then(() => this.setState({didLoad: true}))
    }

    checkLocalStorage() {
        const didPost = localStorage.getItem(DID_POST_FORM)
        if (didPost) {
            localStorage.clear()
        }
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
            entries: this.props.entriesState.entries
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
    
    postContent = async (profile: INewProfile, entries: INewEntry[]) => {
        await this.props.saveProfile(profile)
        const {profileState} = this.props
        const pId = profileState.profile[0] !== undefined ? profileState.profile[0].id : false
        if (pId) {
            await this.props.saveEntries(this.addProfileId(entries, pId))
            const {categoriesState, profileState, entriesState} = this.props
            // WARNING: DELETE PROFILE IF NO ENTRY SUCCESS?
            if (categoriesState.error !== null || profileState.error !== null || entriesState.error !== null) {
                this.setState({showErrorModal: true, didUpload: false})    
            } else {
                console.log('succes uploading')
                localStorage.setItem(DID_POST_FORM, "true")
                this.setState({didUpload: true}) 
            }
        } else {
            this.setState({showErrorModal: true, didUpload: false})
        }
    }

    addProfileId(entries: INewEntry[], profileId: number) {
        entries.forEach(entry => {
            entry.profile_id = profileId
        })
        return entries
    }

    render() {
        const {categories} = this.props.categoriesState
        const {didLoad, didUpload, edit, editIsAdmin, isAllowed} = this.state
        return (
            <Router>
                {!isAllowed ?
                <div>Du har inte tillåtelse att visa den här sidan</div>
                :
                <div>
                    {!didLoad ?
                    <Loader />
                    :
                    <Switch>
                        <Route exact path="/" render={() => (
                            <div>
                                <RegistrationInfo />
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
                    <ErrorModal show={this.state.showErrorModal} onClose={() => this.setState({showErrorModal: false})} />
                </div>
            }
            </Router>
        )
    }
}

const mapStateToProps = (state: IState) => {
    return {
        profileState: state.profileState,
        entriesState: state.entriesState,
        categoriesState: state.categoryState
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