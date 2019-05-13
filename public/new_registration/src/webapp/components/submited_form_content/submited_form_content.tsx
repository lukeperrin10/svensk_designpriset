import * as React from 'react'
import styles from './style'

export interface textContent {
    label: string,
    content: string,
    imageUrl?: string
}

interface ISubmitedFormContent {
    title: string
    content: textContent[],
}

class SubmitedFormContent extends React.Component<ISubmitedFormContent> {
    render() {
        return (
            <div style={styles.container}>
                <h2>{this.props.title}</h2>
                {this.props.content.map((c, i) => {
                    return (
                        <div style={styles.contentItem} key={i}>
                            <p style={{...styles.p, ...styles.label}}>{c.label}:</p>
                            {c.imageUrl ?
                            <div style={styles.uploadedImageContainer}>
                                <img style={styles.image} src={c.imageUrl} />
                            </div>
                            
                            :
                            <p style={styles.p}>{c.content}</p>
                            }
                            
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default SubmitedFormContent