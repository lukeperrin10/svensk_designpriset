import * as React from 'react'
import {useState, useEffect} from 'react'
import { LIMIT_EXTENSIONS } from '../dp_image_upload/dp_image_upload'
import Button from '../../../../components/button'
import DpImageUpload from '../dp_image_upload'
import styles from './dp_multiple_image_upload.module.css'
import { IEntryImage } from '../../../../model'
import { TEMP_AVATAR_URL } from '../../../../config/host'

interface props {
    label: string,
    onSave: (result: string) => any,
    limits?: LIMIT_EXTENSIONS[],
    url: string,
    uploadedImages?: IEntryImage[],
    displayUploadName?: boolean,
    deleteImage?: (image?: string) => void,
    displayErrorProps: boolean,
    errorMessageProps: string,
    readUrl: string,
    deletedImages: string[]
}

const DpMultipleImageUpload = (props:props) => {

    const [showForm, setShowForm] = useState(false)

    const getUrl = (image: string) => {
        console.log(props.deletedImages)
        if (props.deletedImages.indexOf(image) !== -1) return TEMP_AVATAR_URL
        return props.readUrl
    }

    const getAddedImages = (images: IEntryImage[]) => {
        console.log(images)
            const uploaded = images.map(image => {
                return (
                    <DpImageUpload 
                    onSave={onSave} 
                    url={props.url}
                    label={''} 
                    key={'entry_images'+image.image} 
                    errorMessageProps=""
                    displayErrorProps={false}
                    limits={props.limits}
                    displayUploadName={false}
                    uploadedImage={`${getUrl(image.image)}/${image.image}`}
                    uploadedImageAbsolute={image.image}
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