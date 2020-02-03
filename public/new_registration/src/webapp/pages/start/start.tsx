import * as React from 'react'

interface props {
    content: string
}
const Start = ({content}:props) => {
    
    
    return (
        <div>
            <div dangerouslySetInnerHTML={{__html: content}}/>
        </div>
    )
}

export default Start