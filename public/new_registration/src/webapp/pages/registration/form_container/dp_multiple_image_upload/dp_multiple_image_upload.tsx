import * as React from 'react'
import {useState, useEffect} from 'react'
import { LIMIT_EXTENSIONS } from '../dp_image_upload/dp_image_upload'
import Button from '../../../../components/button'
import DpImageUpload from '../dp_image_upload'
import styles from './dp_multiple_image_upload.module.css'

interface props {
    label: string,
    onSave: (result: string) => any,
    limits?: LIMIT_EXTENSIONS[],
    url: string,
    uploadedImages?: string[],
    displayUploadName?: boolean,
    deleteImage?: (image?: string) => void,
    displayErrorProps: boolean,
    errorMessageProps: string,
    readUrl: string
}

const DpMultipleImageUpload = (props:props) => {

    const [showForm, setShowForm] = useState(false)

    const getAddedImages = (images: string[]) => {
            const uploaded = images.map(image => {
                return (
                    <DpImageUpload 
                    onSave={onSave} 
                    url={props.url}
                    label={''} 
                    key={'entry_images'+image} 
                    errorMessageProps=""
                    displayErrorProps={false}
                    limits={props.limits}
                    displayUploadName={false}
                    uploadedImage={`${props.readUrl}/${image}`}
                    uploadedImageAbsolute={image}
                    deleteImage={props.deleteImage}
                />
                )
            })  
            return uploaded
    }

    const onSave = (url: string) => {
        props.onSave(url)
        setShowForm(false)
    }

    return (
        <div>
            <div>
                {props.uploadedImages && getAddedImages(props.uploadedImages)}
            </div>
            {showForm &&
                <DpImageUpload 
                onSave={onSave} 
                url={props.url}
                cancelSub={true}
                label={props.label} 
                key={'entry_images'} 
                errorMessageProps=""
                displayErrorProps={false}
                limits={props.limits}
                displayUploadName={false}
                />}
            {!showForm &&
            <Button className={styles.button} preventDefault={true} title={'+ Lägg till fler bilder'} onClick={() => setShowForm(true)}/>
            }
        </div>
    )
}

export default DpMultipleImageUpload