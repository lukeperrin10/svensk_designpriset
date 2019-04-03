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
        profileErrors: {}
    }
    constructor(p: Props) {
        super(p)
    }
    componentDidMount() {
        window.addEventListener('beforeunload', (e: Event) => {
            console.log('nu lämnar du, fixa nåt här!')
            // e.returnValue = true
        })
    }

    onControlChange = (name: string) => (e: React.FormEvent<FormControlProps>)  => {
        let obj = this.state.newProfile
        obj[name] = e.currentTarget.value
        this.setState({newProfile: obj})
    }

    saveProfile(profile: IEnteredValues) {
        // const savedProfile = JSON.parse(JSON.stringify(profile)) as INewProfile
        let error = false
        const savedProfile: INewProfile = {
            secret: '',
            invoice_paid: 0,
            contact: '',
            company: '',
            address: '',
            zip: '',
            phone: '',
            mail: '',
            homepage: '',
            city: ''
        }
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

    render() {
        return (
            <div>
                <DpForm 
                    fields={FORM_PROFILE_LABELS}
                    buttonText="Nästa"
                    onSubmit={(e: IEnteredValues) => this.saveProfile(e)}
                />
                <DpForm
                    fields={FORM_ENTRY_LABELS}
                    buttonText="Lägg till ett till bidrag"
                    onSubmit={(e: IEnteredValues) => this.saveEntry(e)}
                />
            </div>
        )
    }
}

const mapStateToProps = (state: IState) => {
    return {
        profileState: state.profileState
    }
}

const mapDispatchToProps = (dispatch: Function) => {
    return {
        saveProfile: (profile: INewProfile) => dispatch(saveProfile(profile))
    }
}

export default connect<ReduxProps, DispatchProps, {}, IState>(mapStateToProps, mapDispatchToProps)(FormContainer)