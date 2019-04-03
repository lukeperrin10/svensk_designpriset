import * as React from 'react'
import Form from 'react-bootstrap/Form'
// import Row from 'react-bootstrap/Row'
// import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import {FORM_PROFILE_LABELS} from '../../../config/text'
// import styles from './styles'
import { FormControlProps } from 'react-bootstrap/FormControl';
import styles from './styles';
// import { INewProfile } from 'src/webapp/model';
import {Md5} from 'ts-md5/dist/md5';
import { INewProfile } from 'src/webapp/model';
import { IState, IProfileState } from 'src/webapp/model/state';
import { saveProfile } from 'src/webapp/redux/actions/profile';
import { connect } from 'react-redux';

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

    saveProfile() {
        const {newProfile} = this.state
        const savedProfile = JSON.parse(JSON.stringify(newProfile)) as INewProfile
        savedProfile.secret = `${Md5.hashStr(savedProfile.contact+Date.now())}`
        savedProfile.invoice_paid = 0
        this.props.saveProfile(savedProfile)
    }

    onSubmit(e: React.FormEvent<HTMLFormElement>) {
        const form = e.currentTarget
        if (form.checkValidity() === false) {
            e.preventDefault()
            e.stopPropagation()
        } else {
            this.saveProfile()
            e.preventDefault()
            
        }
        
    }
    render() {
        const {profileValidated} = this.state
        // let i = 0
        return (
            <div>
                <Form
                    style={styles.formGroup}
                    validated={profileValidated}
                    onSubmit={(e: React.FormEvent<HTMLFormElement>) => this.onSubmit(e)}>
                        {Object.keys(FORM_PROFILE_LABELS).map(key => {
                            // i++
                            const item = FORM_PROFILE_LABELS[key]
                            return (
                                <Form.Group key={key}>
                                    <Form.Control
                                        style={styles.input} 
                                        required
                                        type={item.type}
                                        placeholder={item.label} 
                                        defaultValue={this.state.newProfile[key]}
                                        onChange={this.onControlChange(key)}/>
                                    {/* <Form.Control.Feedback type="invalid">
                                        Får inte vara tomt!
                                    </Form.Control.Feedback> */}
                                </Form.Group>  
                            )
                        })}
                    <div style={styles.buttonContainer}>
                        <Button variant="primary" type="submit">
                            Skicka!
                        </Button>
                    </div>
                </Form>
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