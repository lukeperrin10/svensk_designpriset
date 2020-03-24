import * as React from 'react'
import {FORM_PROFILE_LABELS, FORM_ENTRY_LABELS, GENERAL_TEXT, formItems} from '../../../config/text'
import styles from './form_container.module.css'
import {Md5} from 'ts-md5/dist/md5';
import { INewProfile, INewEntry, ICategory, IProfile, IEntry } from '../../../model';
import DpForm from './dp_form';
import { IEnteredValues } from './dp_form/dp_form';
import Button from '../../../components/button'
import OverLay from 'react-bootstrap/OverlayTrigger'
import ToolTip from 'react-bootstrap/Tooltip'
import { isEmptyObject } from '../../../helpers';
import DpImageUpload from './dp_image_upload';
import { LIMIT_EXTENSIONS } from './dp_image_upload/dp_image_upload';
import { POST_TEMP_AVATAR_URL, POST_TEMP_ENTRY_MEDIA_URL, TEMP_AVATAR_URL , AVATAR_URL, POST_TEMP_ENTRY_IMAGES_URL} from '../../../config/host';
import SubmitedFormContent from '../../../components/submited_form_content';
import { textContent } from '../../../components/submited_form_content/submited_form_content';
import Modal from 'react-bootstrap/Modal'
import {CACHED_ENTRIES, CACHED_PROFILE} from '../../../model/constants'
import Logo from '../../../assets/img/logo.png'
import DpMultipleImageUpload from './dp_multiple_image_upload';
import { BUTTON_VARIANTS } from '../../../components/button/button';
import Text, { H1 } from '../../../components/text';
import { TEXT_TYPES, HEADLINE_SIZES } from '../../../components/text/text';


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
        editModeNewEntries: {},
        shouldSubmitProfile: false,
        shouldSubmitEntries: false,
        formError: false,
        selectedCategory: ''
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
            const disabledEntries: {[key: number]: boolean} = {}
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
                this.setCurrentCategory(values)
                this.setState({tempEntries: tempEntries})
                break;
            default:
                break;
        }
    }

    setCurrentCategory(values: IEnteredValues) {
        if ('category_id' in values) {
            this.setState({selectedCategory: values['category_id']})
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
            source: '', format: '', size: '', category_id: 99999999999, webpage: '', entry_images: [], video_url: ''} as INewEntry
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
        this.onShowConfirmButton()
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
        const isEntryImages = type === 'entry_images'
        const obj = this.state.tempEntries
        const errors = JSON.parse(JSON.stringify(this.state.errorEntries))
        if (key in errors) {
            delete errors[key] 
            this.setState({errorEntries: errors})
        } 
        if (key in obj) {
            if (isEntryImages) {
                obj[key][type].push(url)
            } else {
                obj[key][type] = url
            }
            this.setState({tempEntries: obj})
        } else {
            this.setState({tempEntries: {...this.state.tempEntries, [key]: {[type]: isEntryImages ? [url] : url} }})
        }
    }

    //WARNING DELETE FILE BACKEND???
    removeMediaFromEntry(key: string, type: string, image?: string) {
        const obj = this.state.tempEntries
        if (key in obj && type in obj[key]) {
            if (type === 'entry_images') {
                const entryImages = Array.from(obj[key][type]).filter(e => {
                    return e !== image
                })
                obj[key][type] = entryImages
            } else {
                delete obj[key][type] 
            }
            this.setState({tempEntries: obj})
        }
    }

    getCategoryType(cat:{id:number,name:string,short:string,type:string}[]) {
        const {selectedCategory} = this.state
        const selected = cat.filter(c => c.id === parseInt(selectedCategory))
        if (selected && selected.length > 0) {
            return selected[0].type
        }
        return undefined
    }

    getEntryForms() {
        const {tempEntries, disabledEntries, errorEntries, enableDelete, editModeNewEntries, selectedCategory} = this.state
        const {categories, editContent} = this.props
        const amountOfForms = isEmptyObject(tempEntries) ? 1 : Object.keys(tempEntries).length
        const forms = []
        const cat: {id:number,name:string,short:string,type:string}[] = []
        categories.forEach(c => {
            if (c.active === 1) {
                cat.push({
                    id: c.id,
                    name: c.name,
                    short: c.shorttag,
                    type: c.type
                })    
            }
        })
        if ('category_id' in FORM_ENTRY_LABELS) {
            FORM_ENTRY_LABELS['category_id'].selectList = cat
        }
        for(let i = 0; i < amountOfForms; i++) {
            const uploadedAvatar = tempEntries[`${i}`] ? tempEntries[`${i}`].avatar || false : false
            const uploadedMedia = tempEntries[`${i}`] ? tempEntries[`${i}`].source || false : false
            const uploadedEntryImages = tempEntries[`${i}`] ? tempEntries[`${i}`].entry_images || false : false
            const key = `${i}`
            const editPath = key in editModeNewEntries ? TEMP_AVATAR_URL : AVATAR_URL
            const form = <div key={i} ref={el => {
                if (!el) return
                if (this.state.shouldScrollToEntry) {
                    el.scrollIntoView({behavior: 'smooth'})
                }
            }}>
                <DpForm
                categoryType={this.getCategoryType(cat)}
                onError={() => this.onFormError()}
                shouldSubmit={this.state.shouldSubmitEntries}
                fields={FORM_ENTRY_LABELS}
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
                        url={POST_TEMP_AVATAR_URL}
                        label={GENERAL_TEXT.thumbnail_label} 
                        errorMessageProps={key in errorEntries ? errorEntries[key] : undefined}
                        displayErrorProps={key in errorEntries}
                        key={'avatar'} 
                        limits={[LIMIT_EXTENSIONS.JPEG, LIMIT_EXTENSIONS.JPG, LIMIT_EXTENSIONS.PNG]}
                        uploadedImage={uploadedAvatar ? `${editContent ? editPath : TEMP_AVATAR_URL}/${tempEntries[key].avatar}` : undefined}
                        deleteImage={uploadedAvatar ? () => this.removeMediaFromEntry(key, 'avatar') : undefined}
                        />,
                        this.getCategoryType(cat) === 'print' ? <DpImageUpload 
                        onSave={(url: string) => this.addMediaToEntry(key, 'source', url)} 
                        url={POST_TEMP_ENTRY_MEDIA_URL}
                        label={GENERAL_TEXT.entry_media} 
                        key={'media'} 
                        errorMessageProps=""
                        displayErrorProps={false}
                        limits={[LIMIT_EXTENSIONS.PDF]}
                        uploadedImage={uploadedMedia ? `${tempEntries[key].source}` : undefined}
                        displayUploadName={true}
                        deleteImage={uploadedMedia ? () => this.removeMediaFromEntry(key, 'source') : undefined}
                        /> : <div key='media'></div>,
                    <DpMultipleImageUpload 
                        onSave={(url: string) => this.addMediaToEntry(key, 'entry_images', url)} 
                        url={POST_TEMP_ENTRY_IMAGES_URL}
                        label={GENERAL_TEXT.entry_images} 
                        errorMessageProps={key in errorEntries ? errorEntries[key] : undefined}
                        displayErrorProps={key in errorEntries}
                        key={'entry_images'} 
                        limits={[LIMIT_EXTENSIONS.JPEG, LIMIT_EXTENSIONS.JPG, LIMIT_EXTENSIONS.PNG]}
                        readUrl={editContent ? editPath : TEMP_AVATAR_URL}
                        uploadedImages={uploadedEntryImages}
                        deleteImage={(image?: string) => this.removeMediaFromEntry(key, 'entry_images', image)}
                    />
                ]}
                onSubmit={(e: IEnteredValues) => this.saveEntry(e, key)}/>
                
            </div>

            forms.push(form)
        }
        return forms
    }

    

    getCategoryName(short: string) {
        return this.props.categories.filter(c => c.id === parseInt(short))[0].name
    }
    
    submitedFormContent(submited: IEnteredValues, exclude: string[], formItems: formItems, imageLabel?: string,) {
        const content : textContent[] = []
        Object.keys(submited).forEach(item => {
            if ((exclude.filter((ex) => ex === item))[0] !== item) {
                content.push({
                    label: item === 'avatar' ? 'Tummnagel' : item === 'source' ? 'Printbidrag' : formItems[item].label ,
                    content: item === 'category_id' ? this.getCategoryName(submited[item]) : submited[item],
                    imageUrl: imageLabel === item ? `${TEMP_AVATAR_URL}/${submited[item]}` : undefined
                })
            }
        })
        return content
    }

    onFormError() {
        this.setState({formError: true})
    }

    onShowConfirmButton() {
        if (!this.state.formError && isEmptyObject(this.state.errorEntries)) {
            // this.scrollToTop()
            this.setState({displayReview: true})
        }
    }

    onTrySubmit() {
        this.setState({formError: false}, () => {
            this.setState({shouldSubmitProfile: true}, () => {
                this.setState({shouldSubmitProfile: false, shouldSubmitEntries: true}, () => {
                    this.setState({shouldSubmitEntries: false})
                })
            })
        })
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
            <div className={styles.container}>
            {!this.state.didLoad ?
            <div>laddar</div>
            :
            <div>
                <DpForm 
                    onError={() => this.onFormError()}
                    fields={FORM_PROFILE_LABELS}
                    shouldSubmit={this.state.shouldSubmitProfile}
                    onDisabled={() => this.setState({profileDisabled: false, didSaveProfile: false})}
                    buttonText="Spara"
                    onSubmit={(e: IEnteredValues) => this.saveProfile(e)}
                    title="Kontaktuppgifter"
                    buttonDisabledText="Redigera"
                    onValueChange={(v: IEnteredValues) => this.onValueChange('profile', v)}
                    defaultValue={!isEmptyObject(tempProfile) ? tempProfile : null}
                    customComponents={[
                        <div key={1}>
                            {/* <p>Separat fakturaadress mejlas till <a href="mailto:info@designpriset.se">info@designpriset.se</a></p> */}
                        </div>
                    ]}
                />
                {this.getEntryForms()}
                <div>
                    <div>
                        <Button className={styles.button} onClick={() => this.addNewEntryForm()} variant={BUTTON_VARIANTS.SECONDARY} title={'+ Lägg till bidrag'} />
                        <Button onClick={() => this.onTrySubmit()} variant={BUTTON_VARIANTS.PRIMARY} title={'Förhandsgranska anmälan'}/>
                    </div>
                </div>
            </div>
            }
            <Modal 
            dialogClassName={styles.custom_modal} 
            size="lg" 
            centered 
            show={displayReview} 
            // show={true}
            onHide={() => this.setState({displayReview: false})}>
                <div className={styles.modal_content}>
                    <section className={styles.modal}>
                        <header className={styles.modal_header}>
                            <Text type={TEXT_TYPES.H1} headlineSize={HEADLINE_SIZES.LARGE}>Granska anmälan</Text>
                        </header>
                        <SubmitedFormContent 
                            title="Kontaktuppgifter" 
                            profile={tempProfile as IProfile} />
                        {Object.keys(tempEntries).map((e, i) => {
                            return (
                                <SubmitedFormContent 
                                    key={i} 
                                    title={`Bidrag ${i+1}`} 
                                    entry={tempEntries[e]} />
                            )
                        })}
                    </section>
                    <footer>
                        <Button className={styles.button} onClick={() => this.setState({displayReview: false})} variant={BUTTON_VARIANTS.SECONDARY} title='Redigera' />
                        <Button onClick={() => this.saveContent()} variant={BUTTON_VARIANTS.PRIMARY} title='Skicka in' />
                    </footer>
                </div>
            </Modal> 
            </div>
        )
    }
}

export default FormContainer