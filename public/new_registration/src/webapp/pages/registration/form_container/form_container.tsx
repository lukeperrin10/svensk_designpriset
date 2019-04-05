import * as React from 'react'
import {FORM_PROFILE_LABELS, FORM_ENTRY_LABELS} from '../../../config/text'
import styles from './styles'
import { FormControlProps } from 'react-bootstrap/FormControl';
import {Md5} from 'ts-md5/dist/md5';
import { INewProfile, IEntry, INewEntry, ICategory } from 'src/webapp/model';
import { IState, IProfileState } from 'src/webapp/model/state';
import { saveProfile, getProfile } from 'src/webapp/redux/actions/profile';
import { connect } from 'react-redux';
import DpForm from './dp_form';
import { IEnteredValues } from './dp_form/dp_form';
import Button from 'react-bootstrap/Button'
import { getEntries, saveEntries } from 'src/webapp/redux/actions/entries';
import { getCategories } from 'src/webapp/redux/actions/categories';

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

class FormContainer extends React.Component<Props, State> {
    state = {
        newProfile: {},
        profileValidated: false,
        profileErrors: {},
        entries: [],
        numberOfEntries: 1,
        shouldStayOnPage: false,
        didLoad: true,
        savedProfile: {},
        savedEntries: []
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
        this.props.getCategories()
        .then(() => this.setState({didLoad: true}))

        // this.props.getProfile(268)
        // .then(() => this.setState({didLoad: true}))
        // .then(() => {
        //     const {profile} = this.props.profileState
        //     if (profile !== null) {
        //         this.props.getEntries(profile[0].id)
        //         .then(() => console.log(this.props.entries))
        //     }
        // })
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
            this.setState({savedProfile: savedProfile})
            // this.props.saveProfile(savedProfile)
        }
    }

    saveEntry(entry: IEnteredValues) {
        console.log(entry)
        let error = false
        const savedEntry: INewEntry = {profile_id: 9999999,entry_name: '',designer: '',
            illustrator: '',leader: '', avatar: '', secret: '', year: '',customer: '',
            source: '', format: '', size: '', category: '', webpage: ''}
        Object.keys(savedEntry).forEach(key => {
            if (!(key === 'secret' || key === 'invoice_paid')) {
                if (key in entry) {
                    savedEntry[key] = entry[key]
                } else {
                    console.log(key)
                    error = true
                }
            }
        })   
        if (!error) {
            const arr: any[] = Array.from(this.state.savedEntries)
            arr.push(savedEntry)
            this.setState({savedEntries: arr})
        }
    }

    addNewEntryForm() {
        this.setState({numberOfEntries: this.state.numberOfEntries+1})
    }

    getEntryForms() {
        const {numberOfEntries} = this.state
        const {entries, categories} = this.props
        const forms = []
        const cat: {id:number,name:string}[] = []
        categories.forEach(c => {
            cat.push({
                id: c.id,
                name: c.name
            })
        })
        if ('category' in FORM_ENTRY_LABELS) {
            FORM_ENTRY_LABELS['category'].selectList = cat
        }
        for(let i = 0; i < numberOfEntries; i++) {
            const form = <div key={i}>
                <DpForm
                fields={FORM_ENTRY_LABELS}
                buttonText="Spara"
                title={"Bidrag "+(i+1)}
                disabled={false}
                defaultValue={entries[i] || null}
                onSubmit={(e: IEnteredValues) => this.saveEntry(e)}/>
            </div>

            forms.push(form)
        }
        return forms
    }

    render() {
        // console.log(this.props.categories)
        console.log(this.state.savedEntries)
        return (
            <div style={styles.container}>
            {!this.state.didLoad ?
            <div>laddar</div>
            :
            <div>
                <DpForm 
                    fields={FORM_PROFILE_LABELS}
                    buttonText="Spara"
                    onSubmit={(e: IEnteredValues) => this.saveProfile(e)}
                    disabled={false}
                    title="Allmäna uppgifter"
                    buttonDisabledText="Redigera"
                    defaultValue={this.props.profileState.profile !== null ? this.props.profileState.profile[0] : null}
                />
                {this.getEntryForms()}
                <Button onClick={() => this.addNewEntryForm()} variant="primary">Lägg till nytt bidrag</Button>
            </div>
            }
            </div>
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

export default connect<ReduxProps, DispatchProps, {}, IState>(mapStateToProps, mapDispatchToProps)(FormContainer)