import * as React from 'react'
import {FORM_PROFILE_LABELS, FORM_ENTRY_LABELS, GENERAL_TEXT, formItems} from '../../../config/text'
import styles from './styles'
import {Md5} from 'ts-md5/dist/md5';
import { INewProfile, INewEntry, ICategory, IProfile, IEntry } from 'src/webapp/model';
import DpForm from './dp_form';
import { IEnteredValues } from './dp_form/dp_form';
import Button from 'react-bootstrap/Button'
import OverLay from 'react-bootstrap/OverlayTrigger'
import ToolTip from 'react-bootstrap/Tooltip'
import { isEmptyObject } from 'src/webapp/helpers';
import DpImageUpload from './dp_image_upload';
import { LIMIT_EXTENSIONS } from './dp_image_upload/dp_image_upload';
import { TEMP_AVATAR_URL, TEMP_ENTRY_MEDIA_URL, TEMP_AVATAR_SYM , AVATAR_SYM} from 'src/webapp/config/host';
import SubmitedFormContent from 'src/webapp/components/submited_form_content';
import { textContent } from 'src/webapp/components/submited_form_content/submited_form_content';
import Modal from 'react-bootstrap/Modal'
import {CACHED_ENTRIES, CACHED_PROFILE} from '../../../model/constants'
import Logo from '../../../assets/img/logo.png'


interface existingContent {
    profile: IProfile,
    entries: IEntry[]
}

interface IFormContainer {
    categories: ICategory[],
    saveContent: (profile: INewProfile, entries: INewEntry[]) => void,
    editContent?: existingContent,
    adminMode: boolean,
    onDeleteEntry?: (id: number) => void
}

class FormContainer extends React.Component<IFormContainer> {
    state = {
        didLoad: true,
        savedProfile: {},
        savedEntries: {},
        tempProfile: {},
        tempEntries: {},
        disabledEntries: {},
        profileDisabled: false,
        errorEntries: {},
        didSaveProfile: false,
        didSaveEntry: false,
        displayReview: false,
        shouldScrollToEntry: false,
        checkShouldClear: false,
        enableDelete: true,
        editMode: false,
        editModeNewEntries: {}
    }
    constructor(p: any) {
        super(p)
        
        // localStorage.clear()
        
    }
    componentDidMount() {
        window.addEventListener('beforeunload', (e: Event) => {
            if(!this.state.editMode) {
                this.storeSession()
            }
            
        })
        if (this.props.editContent) {
            const disabledEntries = {}
            this.props.editContent.entries.forEach((key, index) => {
                disabledEntries[index] = true
            })
            this.setState({
                tempProfile: this.props.editContent.profile,
                tempEntries: this.props.editContent.entries,
                editMode: true,
                enableDelete: this.props.adminMode,
                profileDisabled: true,
                disabledEntries: disabledEntries,
                didSaveEntry: true,
                didSaveProfile: true
            })
        } else {
            this.hydrateFromLocal()
        }
    }

    componentWillUnmount() {
        window.addEventListener('beforeunload', (e: Event) => {
            if(!this.state.editMode) {
                this.storeSession()
            }
        })
    }

    scrollToTop() {
        window.scrollTo({left: 0, top: document.body.scrollTop, behavior: 'smooth'})
    }

    storeSession() {
        localStorage.setItem(CACHED_PROFILE, JSON.stringify(this.state.tempProfile))
        localStorage.setItem(CACHED_ENTRIES, JSON.stringify(this.state.tempEntries))
    }

    checkClearForm() {

    }

    clearForm() {
        this.setState({savedProfile: {}, tempProfile: {}, savedEntries: {}, tempEntries: {}, checkShouldClear: false}, () => {
            localStorage.removeItem(CACHED_PROFILE)
            localStorage.removeItem(CACHED_ENTRIES)
        })
    }

    removeEntry(key: string) {
        const entries = JSON.parse(JSON.stringify(this.state.savedEntries))
        const temps = JSON.parse(JSON.stringify(this.state.tempEntries))
        const editModeEntries = JSON.parse(JSON.stringify(this.state.editModeNewEntries))
        let id : number = key in entries && 'id' in entries[key] ? entries[key].id : key in temps && 'id' in temps[key] ? temps[key].id : undefined
        if (key in entries) delete entries[key]
        if (key in temps) delete temps[key]
        if (key in editModeEntries) delete editModeEntries[key]
        if (this.state.editMode && this.props.onDeleteEntry && id !== undefined) {
            this.props.onDeleteEntry(id)
        }
        this.setState({savedEntries: entries, tempEntries: temps, editModeNewEntries: editModeEntries})
        
        // Delete temp assets server?
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
        const {tempProfile} = this.state

        let savedProfile : INewProfile
        if ('id' in tempProfile) {
            savedProfile = tempProfile
        } else {
            savedProfile = {secret: '',invoice_paid: 0,
            contact: '',company: '',address: '',zip: '',phone: '',mail: '',
            homepage: '',city: ''}
        }
        
        Object.keys(savedProfile).forEach(key => {
            if (!(key === 'secret' || key === 'invoice_paid')) {
                if (key in profile) {
                    savedProfile[key] = profile[key]
                } else if (key in tempProfile) {
                    savedProfile[key] = tempProfile[key]
                } else {
                    error = true
                }
            }
        })
        savedProfile.secret = savedProfile.secret === '' ? `${Md5.hashStr(savedProfile.contact+Date.now())}` : savedProfile.secret
        
        if (!error) {
            this.setState({savedProfile: savedProfile, profileDisabled: true, didSaveProfile: true})
            localStorage.setItem(CACHED_PROFILE, JSON.stringify(savedProfile))
        }
    }

    saveEntry(entry: IEnteredValues, entryKey: string) {
        let error = false
        const {tempEntries, errorEntries} = this.state
        if (entryKey in errorEntries){
            const errors = JSON.parse(JSON.stringify(errorEntries))
            delete errors[entryKey]
            this.setState({errorEntries: errors})
        } 
        let savedEntry : INewEntry 
        if (entryKey in tempEntries && 'id' in tempEntries[entryKey]) {
            savedEntry = tempEntries[entryKey] as IEntry
            
        } else {
             savedEntry = {profile_id: 9999999,entry_name: '',designer: '',
            illustrator: '',leader: '', avatar: '', secret: '', year: '',customer: '',
            source: '', format: '', size: '', category: '', webpage: ''} as INewEntry
        }
        
        Object.keys(savedEntry).forEach(key => {
            if (!(key === 'secret' || key === 'invoice_paid')) {
                if (key in entry) {
                    savedEntry[key] = entry[key]
                } else if (entryKey in tempEntries) {
                    savedEntry[key] = tempEntries[entryKey][key]
                } else {
                    error = true
                }
            }
        })  
        if (!(savedEntry.avatar)) {
            error = true
            this.setState({errorEntries: {...this.state.errorEntries, [entryKey]: "Bild saknas"}})
        }
        if (!error) {
            const obj: {} = JSON.parse(JSON.stringify(this.state.savedEntries))
            obj[entryKey] = savedEntry
            this.setState({savedEntries: obj, disabledEntries: {...this.state.disabledEntries, [entryKey]: true}}, () => this.entriesSaved())
            
        }
    }

    entriesSaved() {
        const {tempEntries, disabledEntries} = this.state
        let disabled = true
        Object.keys(tempEntries).forEach(o => {
            if (!disabledEntries[o]) {
                disabled = false
            }
        })
        this.setState({didSaveEntry: disabled})
    }

    saveContent() {
        const {savedProfile, savedEntries, editMode} = this.state
        const entries : INewEntry[] = []
        Object.keys(savedEntries).forEach(entry => {
            entries.push(savedEntries[entry])
        })
        
        if (editMode && this.props.editContent) {
            const profile = isEmptyObject(savedProfile) ? this.props.editContent.profile : savedProfile as INewProfile
            const safeEntries = entries.length === 0 ? this.props.editContent.entries : entries
            this.props.saveContent(profile, safeEntries)
        } else {
            this.props.saveContent(savedProfile as INewProfile, entries)
        }
    }

    addNewEntryForm() {
        const {tempEntries, editModeNewEntries} = this.state
        const key = `${Object.keys(tempEntries).length}`
        this.setState({
            tempEntries: {...tempEntries, [key]: {}}, 
            shouldScrollToEntry: true,
            editModeNewEntries: {...editModeNewEntries, [key]: true}
        }, () => this.setState({shouldScrollToEntry: false}))
    }

    addMediaToEntry(key: string, type: string, url: string) {
        const obj = this.state.tempEntries
        const errors = JSON.parse(JSON.stringify(this.state.errorEntries))
        if (key in errors) {
            delete errors[key] 
            this.setState({errorEntries: errors})
        } 
        if (key in obj) {
            obj[key][type] = url
            this.setState({tempEntries: obj})
        } else {
            this.setState({tempEntries: {...this.state.tempEntries, [key]: {[type]: url} }})
        }
    }

    //WARNING DELETE FILE BACKEND???
    removeMediaFromEntry(key: string, type: string) {
        const obj = this.state.tempEntries
        if (key in obj && type in obj[key]) {
            delete obj[key][type] 
            this.setState({tempEntries: obj})
        }
    }

    getEntryForms() {
        const {tempEntries, disabledEntries, errorEntries, enableDelete, editModeNewEntries} = this.state
        const {categories, editContent} = this.props
        const amountOfForms = isEmptyObject(tempEntries) ? 1 : Object.keys(tempEntries).length
        const forms = []
        const cat: {id:number,name:string,short:string}[] = []
        categories.forEach(c => {
            // Exlcude 3 specific categories
            if (c.id !== 30 && c.id !== 29 && c.id !== 51) {
                cat.push({
                    id: c.id,
                    name: c.name,
                    short: c.shorttag
                })    
            }
        })
        if ('category' in FORM_ENTRY_LABELS) {
            FORM_ENTRY_LABELS['category'].selectList = cat
        }
        for(let i = 0; i < amountOfForms; i++) {
            const uploadedAvatar = tempEntries[`${i}`] ? tempEntries[`${i}`].avatar || false : false
            const uploadedMedia = tempEntries[`${i}`] ? tempEntries[`${i}`].source || false : false
            const key = `${i}`
            const editPath = key in editModeNewEntries ? TEMP_AVATAR_SYM : AVATAR_SYM
            const form = <div key={i} ref={el => {
                if (!el) return
                if (this.state.shouldScrollToEntry) {
                    el.scrollIntoView({behavior: 'smooth'})
                }
            }}>
                <DpForm
                fields={FORM_ENTRY_LABELS}
                disabled={disabledEntries[key]}
                onDisabled={() => this.setState({disabledEntries: {...this.state.disabledEntries, [key]: false}, didSaveEntry: false})}
                buttonText="Spara"
                buttonDisabledText="Redigera"
                title={"Bidrag "+(i+1)}
                onValueChange={(v: IEnteredValues) => this.onValueChange('entry', v, key)}
                defaultValue={tempEntries[key] || null}
                onDelete={enableDelete ? () => this.removeEntry(key) : undefined}
                customComponents={[
                    <DpImageUpload 
                        onSave={(url: string) => this.addMediaToEntry(key, 'avatar', url)} 
                        url={TEMP_AVATAR_URL}
                        label={GENERAL_TEXT.thumbnail_label} 
                        errorMessageProps={key in errorEntries ? errorEntries[key] : undefined}
                        displayErrorProps={key in errorEntries}
                        key={'avatar'} 
                        limits={[LIMIT_EXTENSIONS.JPEG, LIMIT_EXTENSIONS.JPG, LIMIT_EXTENSIONS.PNG]}
                        uploadedImage={uploadedAvatar ? `${editContent ? editPath : TEMP_AVATAR_SYM}/${tempEntries[key].avatar}` : undefined}
                        deleteImage={uploadedAvatar ? () => this.removeMediaFromEntry(key, 'avatar') : undefined}
                        />,
                    <DpImageUpload 
                        onSave={(url: string) => this.addMediaToEntry(key, 'source', url)} 
                        url={TEMP_ENTRY_MEDIA_URL}
                        label={GENERAL_TEXT.entry_media} 
                        key={'media'} 
                        errorMessageProps=""
                        displayErrorProps={false}
                        limits={[LIMIT_EXTENSIONS.PDF]}
                        uploadedImage={uploadedMedia ? `${tempEntries[key].source}` : undefined}
                        displayUploadName={true}
                        deleteImage={uploadedMedia ? () => this.removeMediaFromEntry(key, 'source') : undefined}
                        />
                ]}
                onSubmit={(e: IEnteredValues) => this.saveEntry(e, key)}/>
                
            </div>

            forms.push(form)
        }
        return forms
    }

    getCategoryName(short: string) {
        return this.props.categories.filter(c => c.shorttag === short)[0].name
    }
    
    submitedFormContent(submited: IEnteredValues, exclude: string[], formItems: formItems, imageLabel?: string,) {
        const content : textContent[] = []
        Object.keys(submited).forEach(item => {
            if ((exclude.filter((ex) => ex === item))[0] !== item) {
                content.push({
                    label: item === 'avatar' ? 'Tummnagel' : item === 'source' ? 'Printbidrag' : formItems[item].label ,
                    content: item === 'category' ? this.getCategoryName(submited[item]) : submited[item],
                    imageUrl: imageLabel === item ? `${TEMP_AVATAR_SYM}/${submited[item]}` : undefined
                })
            }
        })
        return content
    }

    onShowConfirmButton() {
        this.scrollToTop()
        this.setState({displayReview: true})
    }

    render() {
        const {tempProfile, profileDisabled, didSaveProfile, didSaveEntry, tempEntries, displayReview, checkShouldClear, editMode} = this.state 
        const modalTitle = editMode ? 'Bekräfta uppdatering av uppgifter' : 'Bekräfta uppgifter'
        const ignoreLabels = [
            'created', 
            'id', 
            'is_winner_gold', 
            'is_winner_silver', 
            'is_nominated', 
            'profile_id', 
            'secret', 
            'modified', 
            'sent_nominee_notification',
            'created',
            'year',
            'motivation',
            'secret', 
            'invoice_paid', 
            'id', 
            'modified'
        ]
        return (
            <div style={styles.container}>
            {!this.state.didLoad ?
            <div>laddar</div>
            :
            <div>
                <DpForm 
                    fields={FORM_PROFILE_LABELS}
                    disabled={profileDisabled}
                    onDisabled={() => this.setState({profileDisabled: false, didSaveProfile: false})}
                    buttonText="Spara"
                    onSubmit={(e: IEnteredValues) => this.saveProfile(e)}
                    title="Allmänna uppgifter"
                    buttonDisabledText="Redigera"
                    onValueChange={(v: IEnteredValues) => this.onValueChange('profile', v)}
                    defaultValue={!isEmptyObject(tempProfile) ? tempProfile : null}
                    customComponents={[
                        <div key={1}>
                            <p>Separat fakturaadress mejlas till <a href="mailto:info@designpriset.se">info@designpriset.se</a></p>
                        </div>
                    ]}
                />
                {this.getEntryForms()}
                
                <div style={styles.toolbarContainer}>
                    <div style={styles.toolbar}>
                        {/* <div style={styles.addButtonContainer}> */}
                            <OverLay
                                placement="right"
                                overlay={
                                    <ToolTip id="hej">
                                        Lägg till bidrag
                                    </ToolTip>
                                }>
                                <Button style={styles.addButton} onClick={() => this.addNewEntryForm()} variant="secondary">Lägg till bidrag</Button>
                            </OverLay>
                            <div style={styles.toolbarRight}>
                                <OverLay
                                    placement="left"
                                    overlay={
                                        <ToolTip id="hej">
                                            Rensa allt innehåll i formuläret
                                        </ToolTip>
                                    }>
                                    <Button style={styles.button} onClick={() => {this.setState({checkShouldClear: true})}} variant="secondary">Rensa</Button>
                                </OverLay>
                                <OverLay
                                    placement="left"
                                    overlay={
                                        <ToolTip id="hej">
                                            Förhandsgrandsgranskning
                                        </ToolTip>
                                    }>
                                    <Button style={styles.buttonPrimary} disabled={(!didSaveProfile || !didSaveEntry)} onClick={() => this.onShowConfirmButton()} variant="primary">Gå vidare</Button>
                                </OverLay>
                            </div>
                        {/* </div> */}
                    </div>
                </div>
            </div>
            }
            <Modal dialogClassName="custom-modal" size="lg" centered show={displayReview} onHide={() => this.setState({displayReview: false})}>
                <Modal.Header>
                    <Modal.Title>{modalTitle}</Modal.Title>
                    <img style={styles.logo} src={Logo} alt='Logo' />
                </Modal.Header>
                <Modal.Body style={styles.modalBody}>
                    <p>Kontrollera uppgifterna noggrant och se till att allt stämmer.</p>
                    <p>Klicka sedan på knappen "Skicka in"</p>
                    <SubmitedFormContent 
                        title="Användaruppgifter" 
                        content={this.submitedFormContent(tempProfile,ignoreLabels, FORM_PROFILE_LABELS)} />
                    {Object.keys(tempEntries).map((e, i) => {
                        return (
                            <SubmitedFormContent 
                                key={i} 
                                title={`Bidrag ${i+1}`} 
                                content={this.submitedFormContent(
                                    tempEntries[e], 
                                    ignoreLabels, 
                                    FORM_ENTRY_LABELS, 'avatar')
                                } />
                        )
                    })}
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => this.setState({displayReview: false})} variant="secondary">Redigera</Button>
                    <Button style={styles.buttonPrimary} onClick={() => this.saveContent()} variant="primary">Skicka in</Button>
                </Modal.Footer>
            </Modal>
            <Modal centered show={checkShouldClear}>
            <Modal.Header>
                <Modal.Title>Vill du rensa formuläret?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                    All din data kommer att försvinna
            </Modal.Body>
            <Modal.Footer>
                <Button style={styles.buttonPrimary} variant='primary' onClick={() => this.setState({checkShouldClear: false})}>Avbryt</Button>
                <Button variant='secondary' onClick={() => this.clearForm()}>Rensa</Button>
            </Modal.Footer>
            </Modal>
            </div>
        )
    }
}

export default FormContainer