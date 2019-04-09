import * as React from 'react'
import Button from 'react-bootstrap/Button';
import fetch from 'cross-fetch'
import { TEMP_ASSETS_URL } from 'src/webapp/config/host';
import { getErrorMessage } from 'src/webapp/helpers/errors';
import Spinner from 'react-bootstrap/Spinner'
import styles from './styles';
import check from '../../../../assets/ui/check.png'


interface IDpImageUpload {
    label: string,
    onSave: (result: string) => any,
    limits?: LIMIT_EXTENSIONS[]
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
        image: new File([], ''),
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
    
    saveImage = async () => {
        this.setState({errorUploading: false, errorMessage: ''})
        if (!this.checkExtension()) {
            this.setState({errorUploading: true, errorMessage: 'Fel format!'})
        } else {
            this.setState({errorUploading: false, isLoading: true})
            const formData = new FormData()
            formData.append('temp_image', this.state.image)
            try {
                const res = await fetch(TEMP_ASSETS_URL, {
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
                this.setState({isLoading: false})
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
        const {limits} = this.props
        const containerStyle = didUpLoad ? {...styles.container, ...styles.okColor} : styles.container
        return (
            <div style={containerStyle}>
                <div>
                    <p style={styles.label}>{this.props.label}</p>
                    {limits ? 
                    <p style={styles.limits}>Accepterade format:
                    {limits.map(l => ` ${l}  `)}
                    </p>
                    :null}
                    <input onChange={this.inputOnChange} 
                        type="file" />
                    <Button disabled={isLoading || buttonDisabled} variant="secondary" onClick={() => this.saveImage()}>
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
                <div style={styles.errors}>
                    {errorUploading ? errorMessage : null}
                </div>
                {didUpLoad ? <img style={styles.checkImg} src={check} /> : null}
            </div>
            
        )
    }
}

export default DpImageUpload