import * as React from 'react'
import Button from '../../../../components/button';
import fetch from 'cross-fetch'
import { getErrorMessage } from '../../../../helpers/errors';
import Spinner from 'react-bootstrap/Spinner'
import styles from './dp_image_upload.module.css'
import check from '../../../../assets/ui/check.png'
import Slug from 'slug'
import { BUTTON_VARIANTS, BUTTON_SIZES } from '../../../../components/button/button';
import Text from '../../../../components/text';
import { TEXT_TYPES } from '../../../../components/text/text';


interface IDpImageUpload {
    label: string,
    onSave: (result: string) => any,
    limits?: LIMIT_EXTENSIONS[],
    url: string,
    uploadedImage?: string,
    displayUploadName?: boolean,
    deleteImage?: (image?: string) => void,
    displayErrorProps: boolean,
    errorMessageProps: string,
    cancelSub?: boolean,
    uploadedImageAbsolute?: string
}

export enum LIMIT_EXTENSIONS {
    PDF = 'pdf',
    JPG = 'jpg',
    JPEG = 'jpeg',
    PNG = 'png',
    TIFF = 'tiff'
}

class DpImageUpload extends React.Component<IDpImageUpload> {
    state = {
        image: {name: '', blob: new Blob([])},
        result: '',
        errorUploading: false,
        errorMessage: '',
        isLoading: false,
        buttonDisabled: true,
        didUpLoad: false
    }
    constructor(p: IDpImageUpload) {
        super(p)
    }

    checkExtension() {
        const {image} = this.state
        const {limits} = this.props
        if (limits) {
            let valid = false
            const ext = image.name.split('.').pop() || ''
            limits.forEach(l => {
                if (l === ext.toLowerCase()) {
                    valid = true
                }
            })
            return valid
        } else {
            return true
        }
    }

    deleteImage() {
        const {uploadedImageAbsolute, deleteImage} = this.props
        console.log(uploadedImageAbsolute)
        if (deleteImage) {
            if (uploadedImageAbsolute) deleteImage(uploadedImageAbsolute)
            else {
                deleteImage()
            }
            
        } 
    }

    slugify(s: string) {
        const ext = s.toLocaleLowerCase().split('.').pop()
        const name = s.toLocaleLowerCase().split('.')[0]
        let result = `${Slug(name)}.${ext}`
        return result
    }
    
    saveImage = async () => {
        this.setState({errorUploading: false, errorMessage: ''})
        if (!this.checkExtension()) {
            this.setState({errorUploading: true, errorMessage: 'Fel format!'})
        } else {
            this.setState({errorUploading: false, isLoading: true})
            const formData = new FormData()
            
            formData.append('media', this.state.image as unknown as File, this.slugify(this.state.image.name))
            
            try {
                const res = await fetch(this.props.url, {
                    method: 'POST',
                    body: formData,
                })
                if (!res.ok) {
                    const error = await res.json()
                    this.setState({errorUploading: true, errorMessage: getErrorMessage(error.error)})
                } else {
                    const result = await res.json()
                    this.setState({didUpLoad: true})
                    this.props.onSave(result)
                }
                if (!this.props.cancelSub) this.setState({isLoading: false})
            } catch (error) {
                this.setState({errorUploading: true, errorMessage: getErrorMessage(JSON.parse(error)), isLoading: false})
            }
        }
    }

    inputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({image: (e.target.files as any)[0], buttonDisabled: false}, () => {
            this.saveImage()
        })
    }


    render() {
        const {isLoading, buttonDisabled, errorUploading, errorMessage, didUpLoad} = this.state
        const {limits, uploadedImage, displayUploadName, errorMessageProps, displayErrorProps} = this.props
        return (
            <div className={styles.container}>
                <Text type={TEXT_TYPES.P}>{this.props.label}</Text>
                {uploadedImage ? 
                <div>
                    <div className={styles.image_container}>
                        {displayUploadName ? 
                            <p>{uploadedImage}</p>    
                            :
                            <img className={styles.img} src={uploadedImage} alt='image'/>
                        }
                        
                    </div>
                    <Button onClick={() => this.deleteImage()}  variant={BUTTON_VARIANTS.TERTIARY} size={BUTTON_SIZES.SMALL} title='Ta bort bild'/>
                </div>
                :
                <div>
                    {limits ? 
                    <p className={styles.label}>Accepterade format:
                    {limits.map(l => ` ${l}  `)}
                    </p>
                    :null}
                    <label className={styles.input_label}>
                        <input 
                            className={styles.input}
                            onChange={this.inputOnChange} 
                            type="file"/>
                            Tryck eller släpp här för att ladda upp bild
                    </label>
                        {isLoading &&
                        <div>
                            <Spinner
                                as="span"
                                animation="grow"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                            />
                            Laddar...
                        </div>}
                </div>
                }
                <div className={styles.error}>
                    {errorUploading ? errorMessage : null}
                </div>
                {displayErrorProps ?
                <div>
                    {errorMessageProps}
                </div>
                :null}
            </div>
        )
    }
}

export default DpImageUpload