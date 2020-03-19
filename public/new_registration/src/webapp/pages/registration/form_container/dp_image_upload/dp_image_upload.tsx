import * as React from 'react'
import Button from 'react-bootstrap/Button';
import fetch from 'cross-fetch'
import { getErrorMessage } from '../../../../helpers/errors';
import Spinner from 'react-bootstrap/Spinner'
import styles from './styles';
import check from '../../../../assets/ui/check.png'
import Slug from 'slug'


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
                // this.setState({errorUploading: true, errorMessage: getErrorMessage(JSON.parse(error)), isLoading: false})
            }
        }
    }

    inputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({image: (e.target.files as any)[0], buttonDisabled: false})
    }


    render() {
        const {isLoading, buttonDisabled, errorUploading, errorMessage, didUpLoad} = this.state
        const {limits, uploadedImage, displayUploadName, errorMessageProps, displayErrorProps} = this.props
        const containerStyle = didUpLoad || uploadedImage ? {...styles.container, ...styles.okColor} : styles.container
        return (
            <div style={containerStyle}>
                <div style={styles.labelContainer}>
                    <p style={styles.label}>{this.props.label}</p>
                </div>
                {uploadedImage ? 
                <div style={styles.uploadedContainer}>
                    {displayUploadName ? 
                        <p style={styles.uploadedFileName}>{uploadedImage}</p>    
                        :
                        // <div style={styles.uploadedImageContainer}>
                            <img src={uploadedImage} alt='image' style={styles.uploadedImage} />
                            
                        // </div>
                    }
                    <Button onClick={() => this.deleteImage()} style={styles.deleteButton} variant="secondary">Ta bort</Button>
                </div>
                :
                <div>
                    {limits ? 
                    <p style={styles.limits}>Accepterade format:
                    {limits.map(l => ` ${l}  `)}
                    </p>
                    :null}
                    <input onChange={this.inputOnChange} 
                        type="file"/>
                    <Button style={styles.uploadButton} disabled={isLoading || buttonDisabled} variant="secondary" onClick={() => this.saveImage()}>
                        {isLoading ?
                        <div>
                            <Spinner
                                as="span"
                                animation="grow"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                            />
                            Laddar...
                        </div>
                        : <div>Ladda upp</div> }
                    </Button>    
                </div>
                }
                <div style={styles.errors}>
                    {errorUploading ? errorMessage : null}
                </div>
                {displayErrorProps ?
                <div style={styles.errors}>
                    {errorMessageProps}
                </div>
                :null}
                {didUpLoad || uploadedImage ? 
                <img style={styles.checkImg} src={check} /> 
                : 
                null
            }
            </div>
        )
    }
}

export default DpImageUpload