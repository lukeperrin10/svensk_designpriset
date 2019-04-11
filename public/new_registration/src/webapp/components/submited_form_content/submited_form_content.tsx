import * as React from 'react'

interface textContent {
    label: string,
    content: string,
    url?: string
}

interface ISubmitedFormContent {
    content: textContent[],
}

class SubmitedFormContent extends React.Component<ISubmitedFormContent> {
    render() {
        return (
            <div>
                {this.props.content.map(c => {
                    return (
                        <p>{c.label}</p>
                    )
                })}
            </div>
        )
    }
}

export default SubmitedFormContent