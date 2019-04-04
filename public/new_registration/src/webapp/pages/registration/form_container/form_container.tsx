import * as React from 'react'
// import Form from 'react-bootstrap/Form'
// import Button from 'react-bootstrap/Button'
import {FORM_PROFILE_LABELS, FORM_ENTRY_LABELS} from '../../../config/text'
// import styles from './styles'
import { FormControlProps } from 'react-bootstrap/FormControl';
// import styles from './styles';
import {Md5} from 'ts-md5/dist/md5';
import { INewProfile } from 'src/webapp/model';
import { IState, IProfileState } from 'src/webapp/model/state';
import { saveProfile } from 'src/webapp/redux/actions/profile';
import { connect } from 'react-redux';
import DpForm from './dp_form';
import { IEnteredValues } from './dp_form/dp_form';
import Button from 'react-bootstrap/Button'

interface ReduxProps {
    profileState: IProfileState
}
interface DispatchProps {
    saveProfile: (p: INewProfile) => Promise<any>
}
type Props = ReduxProps & DispatchProps
interface State {}

class FormContainer extends React.Component<Props, State> {
    state = {
        newProfile: {},
        profileValidated: false,
        profileErrors: {},
        entries: [],
        numberOfEntries: 1,
        shouldStayOnPage: false
    }
    constructor(p: Props) {
        super(p)
    }
    componentDidMount() {
        window.addEventListener('beforeunload', (e: Event) => {
            if (this.state.shouldStayOnPage) {
                e.returnValue = true
            }
            
        })
    }

    onControlChange = (name: string) => (e: React.FormEvent<FormControlProps>)  => {
        let obj = this.state.newProfile
        obj[name] = e.currentTarget.value
        this.setState({newProfile: obj})
    }

    saveProfile(profile: IEnteredValues) {
        let error = false
        const savedProfile: INewProfile = {secret: '',invoice_paid: 0,
            contact: '',company: '',address: '',zip: '',phone: '',mail: '',
            homepage: '',city: ''}

        Object.keys(savedProfile).forEach(key => {
            if (!(key === 'secret' || key === 'invoice_paid')) {
                if (key in profile) {
                    savedProfile[key] = profile[key]
                } else {
                    error = true
                }
            }
        })
        savedProfile.secret = `${Md5.hashStr(savedProfile.contact+Date.now())}`
        if (!error) {
            console.log('save profile')
            this.props.saveProfile(savedProfile)
        }
    }

    saveEntry(entry: IEnteredValues) {
        console.log(entry)
    }

    addNewEntryForm() {
        this.setState({numberOfEntries: this.state.numberOfEntries+1})
    }

    getEntryForms() {
        const {numberOfEntries} = this.state
        const forms = []
        for(let i = 1; i <= numberOfEntries; i++) {

            const form = <div key={i}>
                {"Bidrag "+i}
                <DpForm
                fields={FORM_ENTRY_LABELS}
                buttonText="Spara"
                onSubmit={(e: IEnteredValues) => this.saveEntry(e)}/>
            </div>

            forms.push(form)
        }
        return forms
    }

    render() {
        console.log(this.props.profileState)
        return (
            <div>
                <DpForm 
                    fields={FORM_PROFILE_LABELS}
                    buttonText="Spara"
                    onSubmit={(e: IEnteredValues) => this.saveProfile(e)}
                />
                {this.getEntryForms()}
                <Button onClick={() => this.addNewEntryForm()} variant="primary">Lägg till nytt bidrag</Button>
            </div>
        )
    }
}

const mapStateToProps = (state: IState) => {
    return {
        profileState: state.profileState,
    }
}

const mapDispatchToProps = (dispatch: Function) => {
    return {
        saveProfile: (profile: INewProfile) => dispatch(saveProfile(profile))
    }
}

export default connect<ReduxProps, DispatchProps, {}, IState>(mapStateToProps, mapDispatchToProps)(FormContainer)