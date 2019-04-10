import * as React from 'react'
import {FORM_PROFILE_LABELS, FORM_ENTRY_LABELS, GENERAL_TEXT} from '../../../config/text'
import styles from './styles'
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
import { isEmptyObject } from 'src/webapp/helpers';
import DpImageUpload from './dp_image_upload';
import { LIMIT_EXTENSIONS } from './dp_image_upload/dp_image_upload';
import { TEMP_AVATAR_URL, TEMP_ENTRY_MEDIA_URL } from 'src/webapp/config/host';

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

const CACHED_PROFILE = "CACHED_PROFILE"
const CACHED_ENTRIES = "CACHED_ENTRIES"

class FormContainer extends React.Component<Props, State> {
    state = {
        didLoad: true,
        savedProfile: {},
        savedEntries: [],
        tempProfile: {},
        tempEntries: {},
    }
    constructor(p: Props) {
        super(p)
        // localStorage.clear()
        
    }
    componentDidMount() {
        window.addEventListener('beforeunload', (e: Event) => {
            this.storeSession()
        })
        this.hydrateFromLocal()
        this.props.getCategories()
        .then(() => this.setState({didLoad: true})) 
    }

    componentWillUnmount() {
        window.addEventListener('beforeunload', (e: Event) => {
            this.storeSession()
        })
    }

    storeSession() {
        localStorage.setItem(CACHED_PROFILE, JSON.stringify(this.state.tempProfile))
        localStorage.setItem(CACHED_ENTRIES, JSON.stringify(this.state.tempEntries))
    }

    hydrateFromLocal() {
        this.setState({
            tempProfile: localStorage.hasOwnProperty(CACHED_PROFILE) ? 
            JSON.parse(localStorage.getItem(CACHED_PROFILE) || '') : {}
        })
        const entries = localStorage.hasOwnProperty(CACHED_ENTRIES) ? 
        JSON.parse(localStorage.getItem(CACHED_ENTRIES) || '') : {}
        if (!isEmptyObject(entries)) {
            Object.keys(entries).forEach(e => {
                if (isEmptyObject(entries[e])) {
                    delete entries[e]
                    console.log(entries[e])
                }
            })
        }
        this.setState({tempEntries: entries})
    }

    onValueChange(form: string, values: IEnteredValues, key?: string) {
        const {tempProfile, tempEntries} = this.state
        switch(form) {
            case 'profile':
            Object.keys(values).forEach(v => {
                tempProfile[v] = values[v]
            })
            this.setState({tempProfile: tempProfile})
            break;
            case 'entry':
                if(key) {
                    if(key in tempEntries) {
                        Object.keys(values).forEach(v => {
                            tempEntries[key][v] = values[v]
                        })
                    } else {
                        tempEntries[key] = values
                    }
                }
            this.setState({tempEntries: tempEntries})
            break;
            default:
            break;
        }
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
            console.log(savedProfile)
            localStorage.setItem(CACHED_PROFILE, JSON.stringify(savedProfile))
            // this.props.saveProfile(savedProfile)
        }
    }

    saveEntry(entry: IEnteredValues) {
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
        const {tempEntries} = this.state
        const key = `${Object.keys(tempEntries).length}`
        this.setState({tempEntries: {...tempEntries, [key]: {}}})
        
    }

    addMediaToEntry(key: string, type: string, url: string) {
        const {tempEntries} = this.state
        if(key in tempEntries) {
            tempEntries[key][type] = url
            this.setState({tempEntries: tempEntries})
        }
    }

    getEntryForms() {
        const {tempEntries} = this.state
        const {categories} = this.props
        const amountOfForms = isEmptyObject(tempEntries) ? 1 : Object.keys(tempEntries).length
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
        for(let i = 0; i < amountOfForms; i++) {
            const form = <div key={i}>
                <DpForm
                fields={FORM_ENTRY_LABELS}
                buttonText="Spara"
                title={"Bidrag "+(i+1)}
                disabled={false}
                onValueChange={(v: IEnteredValues) => this.onValueChange('entry', v, `${i}`)}
                defaultValue={tempEntries[`${i}`] || null}
                customComponents={[
                    <DpImageUpload 
                        onSave={(url: string) => this.addMediaToEntry(`${i}`, 'avatar', url)} 
                        url={TEMP_AVATAR_URL}
                        label={GENERAL_TEXT.thumbnail_label} 
                        key={'avatar'} 
                        limits={[LIMIT_EXTENSIONS.JPEG, LIMIT_EXTENSIONS.JPG, LIMIT_EXTENSIONS.PNG]}
                        />,
                    <DpImageUpload 
                    onSave={(url: string) => this.addMediaToEntry(`${i}`, 'source', url)} 
                        url={TEMP_ENTRY_MEDIA_URL}
                        label={GENERAL_TEXT.entry_media} 
                        key={'media'} 
                        limits={[LIMIT_EXTENSIONS.PDF]}
                        />
                ]}
                onSubmit={(e: IEnteredValues) => this.saveEntry(e)}/>
                
            </div>

            forms.push(form)
        }
        return forms
    }

    render() {
        const {tempProfile} = this.state 
        console.log(this.state.tempEntries)
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
                    onValueChange={(v: IEnteredValues) => this.onValueChange('profile', v)}
                    defaultValue={!isEmptyObject(tempProfile) ? tempProfile : null}
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